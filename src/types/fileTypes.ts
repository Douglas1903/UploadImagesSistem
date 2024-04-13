export interface File {
    id: number;
    filename: string;
    data: Decode;
}

interface Decode {
    type: string;
    data: number[]
}