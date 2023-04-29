function Recursive_DET(x, isComplex) {
    if (x.length == 2) return (isComplex) ? (x[0][0].Multiply(x[1][1]).MINUS(x[0][1].Multiply(x[1][0]))) : (x[0][0] * x[1][1] - x[0][1] * x[1][0]);
    else if (x.length == 1) return x[0][0];
    var a = [];
    for (let i = 0; i < x.length; i++) a.push([...x[i]]);
    var factor = (isComplex) ? (new Complex(1.0, 0.0)) : 1.0;
    while (a.length > 2) {
        if (isComplex) {
            if (a[0][0].real == 0.0 && a[0][0].img == 0.0) {
                for (var t = 0; t < a.length; t++) {
                    if (a[t][0].real !== 0.0 || a[t][0].img !== 0.0) {
                        for (var s = 0; s < a.length; s++) {
                            var temp = a[t][s];
                            a[t][s] = a[0][s];
                            a[0][s] = temp;
                        } factor.ConstMultiply(-1.0); break;
                    }
                    if (a[t][0].real == 0 && a[t][0].img == 0 && t == a.length - 1) return new Complex(0.0, 0.0);
                }
            }
            let tempCom = factor.Multiply(a[0][0]);
            factor.img = tempCom.img;
            factor.real = tempCom.real;
        } else {
            if (a[0][0] == 0.0) {
                for (t = 0; t < a.length; t++) {
                    if (a[t][0] !== 0.0) {
                        for (s = 0; s < a.length; s++) {
                            temp = a[t][s];
                            a[t][s] = a[0][s];
                            a[0][s] = temp;
                        } factor *= -1.0; break;
                    }
                    if (a[t][0] == 0.0 && t == a.length - 1) return 0.0;
                }
            } factor *= a[0][0];
        }
        var tempArr = [];
        for (let i = 1; i < a.length; i++) {
            var b = [];
            for (let j = 1; j < a.length; j++) b.push((isComplex) ? (a[i][j].MINUS(a[0][j].Multiply(a[i][0]).Divide(a[0][0]))) : (a[i][j] - a[0][j] * a[i][0] / a[0][0]));
            tempArr.push(b);
        }
        a = [];
        for (let i = 0; i < tempArr.length; i++) a.push([...tempArr[i]])
    } return (isComplex) ? factor.Multiply(a[0][0].Multiply(a[1][1]).MINUS(a[0][1].Multiply(a[1][0]))) : factor * (a[0][0] * a[1][1] - a[0][1] * a[1][0]);
}

function DET(arr, isComplex) {
    var x = [];
    for (var i = 0; i < arr.length; i++) {
        var y = [];
        for (var j = 0; j < arr[i].length; j++) {
            if (isComplex) y.push(new Complex(arr[i][j].real, arr[i][j].img));
            else y.push(arr[i][j]);
        }
        x.push([...y]);
    }
    //x=JSON.parse(JSON.stringify(arr));
    return Recursive_DET(x, isComplex);
}

function Transpose(A) {
    var B = [], C = [];
    for (var i = 0; i < A[0].length; i++) {
        for (var j = 0; j < A.length; j++) C.push(A[j][i]);
        B.push(C); C = [];
    } return B;
}

function Adjoint(x, isComplex) {
    if (x.length == 2) {
        var a = [];
        a.push([x[1][1], (isComplex) ? (x[1][0].ConstMultiplyReturn(-1)) : (x[1][0] * (-1))]);
        a.push([(isComplex) ? (x[0][1].ConstMultiplyReturn(-1)) : (x[0][1] * (-1)), x[0][0]]);
        return Transpose(a);
    }
    var matrix = [], res = [];
    var temp1 = [], temp2 = [];
    for (var i = 0; i < x.length; i++) {
        for (var j = 0; j < x.length; j++) {
            for (var k = 0; k < x.length; k++) {
                if (k !== i) {
                    temp2 = [];
                    for (var l = 0; l < x.length; l++) {
                        if (l !== j) temp2.push(x[k][l]);
                    }
                    matrix.push(temp2);
                }
            }
            var pt = DET(matrix, isComplex);
            if (isComplex) {
                if (isNaN(pt.real)) pt.real = 0;
                if (isNaN(pt.img)) pt.img = 0;
            }
            else if (isNaN(pt)) pt = 0;
            if ((i + j + 2) % 2 !== 0) {
                if (isComplex) pt.ConstMultiply(-1);
                else pt *= -1;
            }
            matrix = []; temp1.push(pt);
        }
        res.push(temp1); temp1 = [];
    }
    return Transpose(res);
}

function Inverse(x, isComplex) {
    var a = DET(x, isComplex);
    if (isComplex) {
        if (a.real == 0 && a.img == 0) throw "Inverse not Possible";
        var adj = Adjoint(x, true);
        for (var i = 0; i < adj.length; i++) {
            for (var j = 0; j < adj.length; j++) adj[i][j] = adj[i][j].Divide(a);
        } return adj;
    }
    else {
        if (a == 0) throw "Inverse not Possible";
        adj = Adjoint(x, false);
        for (i = 0; i < adj.length; i++) {
            for (j = 0; j < adj.length; j++) adj[i][j] /= a;
        } return adj;
    }
}

class Complex {
    constructor(x, y) {
        this.real = x;
        this.img = y;
    }
    //MOD(){ return Math.sqrt(this.real*this.real+this.img*this.img); }
    ADD(a) { return new Complex(this.real + a.real, this.img + a.img); }
    MINUS(a) { return new Complex(this.real - a.real, this.img - a.img); }
    Equals(a) { return (this.real == a.real && this.img == a.img); }
    Conjugate() { return new Complex(this.real, this.img * (-1)); }
    Multiply(a) { return new Complex((this.real * a.real) - (this.img * a.img), (this.real * a.img) + (this.img * a.real)); }
    Divide(a) {
        if (this.Equals(a)) return Complex(1, 0);
        var b = this.Multiply(a.Conjugate());
        var d = Math.pow(a.real, 2) + Math.pow(a.img, 2);
        return new Complex(b.real / d, b.img / d);
    }
    ConstMultiply(num) { this.real *= num; this.img *= num; }
    ConstMultiplyReturn(num) { return new Complex((this.real) * num, (this.img) * num); }
    toSTR(decimals) {
        var str = "";
        if (this.real == 0 && this.img == 0) return (0).toFixed(decimals).toString();
        else if (this.real !== 0) {
            str += this.real.toFixed(decimals).toString();
            if (this.img !== 0) {
                str += (this.img > 0) ? ("+") : ("");
                if (this.img == 1) str += "i";
                else if (this.img == -1) str += "-i";
                else str += this.img.toFixed(decimals).toString() + "i";
            }
        }
        else {
            if (this.img == 1) str += "i";
            else if (this.img == -1) str += "-i";
            else str += this.img.toFixed(decimals).toString() + "i";
        }
        return str;
    }
}

function MatMul(A, B, isComplex) {
    var sum = (isComplex) ? (new Complex(0, 0)) : (0);
    var C = [], temp = [];
    for (var k = 0; k < B[0].length; k++) {
        for (var i = 0; i < A.length; i++) {
            for (var j = 0; j < A[0].length; j++) {
                console.info(typeof A[i][j]);
                if (isComplex) sum = sum.ADD(A[i][j].Multiply(B[j][k]));
                else sum += A[i][j] * B[j][k];
            }
            temp.push(sum);
            sum = (isComplex) ? (new Complex(0, 0)) : (0);
        } C.push(temp); temp = [];
    }
    return Transpose(C);
}

function Power(A, power, isComplex) {
    if (power == 1) return A;
    var C = []; C = MatMul(A, A, isComplex);
    for (var k = 0; k < power - 2; k++) {
        C = MatMul(C, A, isComplex);
    } return C;
}

function ADD(A, B, isComplex) {
    var C = [], temp = [];
    for (var i = 0; i < A.length; i++) {
        for (var j = 0; j < A[i].length; j++) temp.push((isComplex) ? (A[i][j].ADD(B[i][j])) : (A[i][j] + B[i][j]));
        C.push(temp); temp = [];
    } return C;
}

function MINUS(A, B, isComplex) {
    var C = [], temp = [];
    for (var i = 0; i < A.length; i++) {
        for (var j = 0; j < A[i].length; j++) temp.push((isComplex) ? (A[i][j].MINUS(B[i][j])) : (A[i][j] - B[i][j]));
        C.push(temp); temp = [];
    } return C;
}

const MathOBJ = {
    Determinant: DET,
    Transpose: Transpose,
    Adjoint: Adjoint,
    Inverse: Inverse,
    ADD: ADD,
    MINUS: MINUS,
    Matrix_Multiplication: MatMul,
    complex: Complex,
    Power: Power
}

export default MathOBJ;