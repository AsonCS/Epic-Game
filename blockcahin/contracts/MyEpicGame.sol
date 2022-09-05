//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// Contrato NFT para herdar.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Funcoes de ajuda que o OpenZeppelin providencia.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Helper que escrevemos para codificar em Base64
import "./libraries/Base64.sol";

import "hardhat/console.sol";

// Nosso contrato herda do ERC721, que eh o contrato padrao de
// NFT!
contract MyEpicGame is ERC721 {
    // O tokenId eh o identificador unico das NFTs, eh um numero
    // que vai incrementando, como 0, 1, 2, 3, etc.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Nos vamos segurar os atributos dos nossos personagens em uma
    //struct. Sinta-se livre para adicionar o que quiser como um
    //atributo! (ex: defesa, chance de critico, etc).
    struct CharacterAttributes {
        uint256 characterIndex;
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 dodgeSkill;
        uint256 points;
    }

    struct BigBoss {
        string name;
        string imageURI;
        uint256 attackDamage;
    }
    BigBoss public bigBoss;

    // Uma pequena array vai nos ajudar a segurar os dados padrao dos
    // nossos personagens. Isso vai ajudar muito quando mintarmos nossos
    // personagens novos e precisarmos saber o HP, dano de ataque e etc.
    CharacterAttributes[] private defaultCharacters;

    // Criamos um mapping do tokenId => atributos das NFTs.
    CharacterAttributes[] private nfts;

    // Um mapping de um endereco => tokenId das NFTs, nos da um
    // jeito facil de armazenar o dono da NFT e referenciar ele
    // depois.
    mapping(address => uint256) private holders;

    // Dados passados no contrato quando ele for criado inicialmente,
    // inicializando os personagens.
    // Vamos passar esse valores do run.js
    // Embaixo, voce tambem pode ver que adicionei um simbolo especial para identificar nossas NFTs
    // Esse eh o nome e o simbolo do nosso token, ex Ethereum ETH.
    // Eu chamei o meu de Heroes e HERO. Lembre-se, um NFT eh soh um token!
    constructor(
        string[] memory characterNames,
        string[] memory characterImageURIs,
        uint256[] memory characterHp,
        uint256[] memory characterDodgeSkill,
        string memory bossName,
        string memory bossImageURI,
        uint256 bossAttackDamage
    ) payable ERC721("Animals", "ANMA") {
        // Inicializa o boss. Salva na nossa variável global de estado "bigBoss".
        bigBoss = BigBoss({
            name: bossName,
            imageURI: bossImageURI,
            attackDamage: bossAttackDamage
        });

        // Faz um loop por todos os personagens e salva os valores deles no
        // contrato para que possamos usa-los depois para mintar as NFTs
        for (uint256 i = 0; i < characterNames.length; i += 1) {
            defaultCharacters.push(
                CharacterAttributes({
                    characterIndex: i,
                    name: characterNames[i],
                    imageURI: characterImageURIs[i],
                    hp: characterHp[i],
                    maxHp: characterHp[i],
                    dodgeSkill: characterDodgeSkill[i],
                    points: 0
                })
            );
        }

        // Eu incrementei tokenIds aqui para que minha primeira NFT tenha o ID 1.
        // Mais nisso na aula!
        _tokenIds.increment();
    }

    // Usuarios vao poder usar essa funcao e pegar a NFT baseado no personagem que mandarem!
    function mintCharacterNFT(uint256 _characterIndex) external {
        // Pega o tokenId atual (começa em 1 já que incrementamos no constructor).
        uint256 newItemId = _tokenIds.current();

        // A funcao magica! Atribui o tokenID para o endereço da carteira de quem chamou o contrato.
        _safeMint(msg.sender, newItemId);

        // Nos mapeamos o tokenId => os atributos dos personagens. Mais disso abaixo
        nfts.push(
            CharacterAttributes({
                characterIndex: _characterIndex,
                name: defaultCharacters[_characterIndex].name,
                imageURI: defaultCharacters[_characterIndex].imageURI,
                hp: defaultCharacters[_characterIndex].hp,
                maxHp: defaultCharacters[_characterIndex].maxHp,
                dodgeSkill: defaultCharacters[_characterIndex].dodgeSkill,
                points: defaultCharacters[_characterIndex].points
            })
        );

        // console.log(
        //     "Mintou NFT c/ tokenId %s e characterIndex %s",
        //     newItemId,
        //     _characterIndex
        // );

        // Mantem um jeito facil de ver quem possui a NFT
        holders[msg.sender] = newItemId;

        // Incrementa o tokenId para a proxima pessoa que usar.
        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        CharacterAttributes memory charAttributes = nfts[_tokenId - 1];

        string memory strHp = Strings.toString(charAttributes.hp);
        string memory strMaxHp = Strings.toString(charAttributes.maxHp);
        string memory dodgeSkill = Strings.toString(charAttributes.dodgeSkill);
        string memory points = Strings.toString(charAttributes.points);

        bytes memory json = abi.encodePacked(
            "{",
            '"name": "',
            charAttributes.name,
            " #",
            Strings.toString(_tokenId),
            '", "description": "This NFT gives access to the game", "image": "',
            charAttributes.imageURI,
            '", "attributes": [ { "trait_type": "Health Points", "value": ',
            strHp,
            ', "max_value": ',
            strMaxHp,
            '}, { "trait_type": "Dodge Skill", "value": ',
            dodgeSkill,
            '}, { "trait_type": "Points", "value": ',
            points,
            "} ]}"
        );

        // console.log(string(json));

        string memory output = string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(json)
            )
        );

        return output;
    }

    function getAttack() public {
        uint256 nftTokenIdOfPlayer = holders[msg.sender] - 1;
        CharacterAttributes storage player = nfts[nftTokenIdOfPlayer];

        // Tenha certeza que o hp do jogador é maior que 0.
        require(
            player.hp > 0,
            "Error: personagem precisa ter HP para atacar o boss."
        );

        uint256 damage = ((block.timestamp) % bigBoss.attackDamage) + 10;

        console.log(
            "\n player.hp=%s, damage=%s, bigBoss.attackDamage=%s",
            Strings.toString(player.hp),
            Strings.toString(damage),
            Strings.toString(bigBoss.attackDamage)
        );

        // Permite que o boss ataque o jogador.
        if (player.hp < damage) {
            player.hp = 0;
        } else {
            player.hp = player.hp - damage;
        }

        console.log(" player.hp=%s", Strings.toString(player.hp));
    }

    function getCharacterAttributes()
        public
        view
        returns (CharacterAttributes[] memory)
    {
        return defaultCharacters;
    }

    function getNfts() public view returns (CharacterAttributes[] memory) {
        return nfts;
    }
}
