import { expect } from "chai";
import math from "./matrix.mjs";

describe("Determinant",()=>{
    it("should return -168",()=>{
        var arr=[
            [-7,3,5,9],
            [0,2,8,0],
            [0,0,3,2],
            [0,0,0,4]
        ];
        expect(math.Determinant(arr)).to.be.eq(-168);
    });
});

describe("Complex Determinant",()=>{
    it("should return -393+225i",()=>{
        var arr2=[
            [new math.complex(2,3), new math.complex(7,0), new math.complex(3,2), new math.complex(0,1)],
            [new math.complex(0,4), new math.complex(3,5), new math.complex(0,7), new math.complex(6,0)],
            [new math.complex(2,1), new math.complex(0,1), new math.complex(0,3), new math.complex(3,0)],
            [new math.complex(0,1), new math.complex(2,0), new math.complex(3,0), new math.complex(4,5)]
        ];
        expect(math.Determinant(arr2,true).toSTR(0)).to.be.eq("-393+225i");
    });
});
