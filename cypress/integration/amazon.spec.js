import homePageEle from "./pageObjects/homePageEle";
const home = require("../fixtures/amazon.json");

describe("convert data to Json", () => {
  it("read data from xcel", () => {
    cy.parseXlsx("cypress/fixtures/TestData.xlsx").then((jsonData) => {
      const rowLength = Cypress.$(jsonData[0].data).length;
      for (let index = 0; index < rowLength; index++) {
        var jsonData = jsonData[index].data;
        //console.log(jsonData[index].data)
        cy.writeFile("cypress/fixtures/amazon.json", {
          amazon: jsonData[0][0],
          cartEmptyMsg: jsonData[0][1],
          productName: jsonData[0][2],
          addToCartMsg: jsonData[0][3],
          productNameVer: jsonData[0][4],
        });
      }
    });
  });
});

describe("Amazon Add To Cart Functionality", () => {
  it("Visit Amazon Page", () => {
    //visit amazon website
    homePageEle.visit(home.amazon);
  });
  it("Navigate to cart details page and verify cart is empty", () => {
    cy.fixture("amazon").then((user) => {
      homePageEle.naviagteToCart(user.cartEmptyMsg);
    });
  });
  it("Search boat headphone using search functionality", () => {
    homePageEle.search(home.productName);
  });
  it("Visit the 3rd link from the search products", () => {
    homePageEle.clickOnThirdEle();
  });
  it("Add the 3rd item to cart", () => {
    homePageEle.goToCart(home.addToCartMsg);
    homePageEle.addedItemVer(home.productNameVer);
  });
  it("Delete the item and Check item count", () => {
    homePageEle.deleteItem();
    homePageEle.cartItemCount();
  });
});
