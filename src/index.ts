import crypto from 'crypto';

interface BlockShape {
  hash: string;
  prevHash: string; // 이전 해쉬값
  height: number; // 블록 위치 표시
  data: string; 
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string,
  ){
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string){
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest('hex');
  };
}

class Blockchain {
  private blocks: Block[];
  constructor(){
    this.blocks = [];
  }
  private getPrevHash() {
    if(this.blocks.length === 0) return ''
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string){
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks]; // 배열 안에 있는 데이터를 가진 새로운 배열을 리턴 
  }
}

const blockchain = new Blockchain();

blockchain.addBlock('first one')
blockchain.addBlock('second one')
blockchain.addBlock('third one')
blockchain.addBlock('fourth one')

blockchain.getBlocks().push(new Block('xxxx', 111111, 'HACKEDDDD'));

console.log(blockchain.getBlocks());