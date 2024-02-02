const prices = [
    { id: 1, name: "Rs0-Rs100", array: [0, 100] },
    { id: 2, name: "Rs100-Rs200", array: [100, 200] },
    { id: 3, name: "Rs200-Rs500", array: [200, 500] },
    { id: 4, name: "Rs500-Rs1000", array: [500, 1000] },
    { id: 5, name: "Rs1000-Rs2000", array: [1000, 2000] },
    { id: 6, name: "Rs2000-Rs5000", array: [2000, 5000] },
    { id: 7, name: "Rs5000-Rs10000", array: [5000, 10000] },
    { id: 8, name: "Rs10000 and above", array: [10000, Infinity] }
];
const validDiscount = [
    {
        id: 1, name: "0%-10%", array: [0, 10]
    },
    {
        id: 2, name: "11%-20%", array: [11, 20]
    },
    {
        id: 3, name: "21%-30%", array: [21, 30]
    },
    {
        id: 4, name: "31%-40%", array: [31, 40]
    },
    {
        id: 5, name: "41%-50%", array: [41, 50]
    },
    {
        id: 6, name: "51%-60%", array: [51, 60]
    },
    {
        id: 7, name: "61%-70%", array: [61, 70]
    },
    {
        id: 8, name: "71%-80%", array: [71, 80]
    },
    {
        id: 9, name: "81%-90%", array: [81, 90]
    },
    {
        id: 10, name: "91%-100%", array: [91, 100]
    },
];
const shoeSizes = [
    {
        id: 1, name: "US 4", range: [4, 4.5], value:4
    },
    {
        id: 2, name: "US 5", range: [5, 5.5], value:5
    },
    {
        id: 3, name: "US 6", range: [6, 6.5], value:6
    },
    {
        id: 4, name: "US 7", range: [7, 7.5], value:7
    },
    {
        id: 5, name: "US 8", range: [8, 8.5], value:8
    },
    {
        id: 6, name: "US 9", range: [9, 9.5], value:9
    },
    {
        id: 7, name: "US 10", range: [10, 10.5], value:10
    },
    {
        id: 8, name: "US 11", range: [11, 11.5], value:11
    },
    {
        id: 9, name: "US 12", range: [12, 12.5], value:12
    },
    {
        id: 10, name: "US 13", range: [13, 13.5], value:13
    },
];

export {prices,shoeSizes,validDiscount};