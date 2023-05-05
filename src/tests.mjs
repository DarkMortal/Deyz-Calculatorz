import { expect } from "chai";
import math from "./matrix.mjs";
import base_obj from "./bases.mjs";

describe("Determinant", () => {
    it("should return -168", () => {
        var arr = [
            [-7, 3, 5, 9],
            [0, 2, 8, 0],
            [0, 0, 3, 2],
            [0, 0, 0, 4]
        ];
        expect(math.Determinant(arr)).to.be.eq(-168);
    });
});

describe("Complex Determinant", () => {
    it("should return -393+225i", () => {
        var arr2 = [
            [new math.complex(2, 3), new math.complex(7, 0), new math.complex(3, 2), new math.complex(0, 1)],
            [new math.complex(0, 4), new math.complex(3, 5), new math.complex(0, 7), new math.complex(6, 0)],
            [new math.complex(2, 1), new math.complex(0, 1), new math.complex(0, 3), new math.complex(3, 0)],
            [new math.complex(0, 1), new math.complex(2, 0), new math.complex(3, 0), new math.complex(4, 5)]
        ];
        expect(math.Determinant(arr2, true).toSTR(0)).to.be.eq("-393+225i");
    });
});

describe("Binary to Octal",() => {
    it("should return 53.46", () => {
        var oct = base_obj.convertToBase("101011.10011",2,8,2);
        expect(oct).to.be.eq("53.46");
    })
});

describe("Octal to Hexadecimal",() => {
    it("should return 91.FD", () => {
        var hex = base_obj.convertToBase("221.772",8,16,2);
        expect(hex).to.be.eq("91.FD");
    })
});

describe("Base_18 to Base_25",() => {
    it("should return 5G8BLME.0", () => {
        var hash = base_obj.convertToBase("24A86D21",18,25,1);
        expect(hash).to.be.eq("5G8BLME.0");
    })
});