class homePageEle {
  //launch webpage : visit method
  visit(value) {
    cy.visit("https://www.amazon.in/");
    cy.url().should("include", value);
  }
  naviagteToCart(value) {
    cy.get("#nav-cart-count-container").click({ force: true });
    //verify cart is empty
    cy.get("h2").should("contain", value);
  }
  search(value) {
      //search boat headphone product
    cy.get("#twotabsearchtextbox").click().type(value);
    cy.get("#nav-search-submit-button").click();
  }
  clickOnThirdEle() {
    cy.get("div h2 a")
      .first()
      .invoke("removeAttr", "target")
      .click({ timeout: 8000 });
  }
  goToCart(value) {
    //add to cart
    cy.get("#add-to-cart-button").click({timeout: 8000}).should("have.value", value);
    //check item count : 1
    cy.get("#nav-cart-count").click({timeout: 8000}).should("contain", 1);
  }
  addedItemVer(value) {
    cy.get(".nav-cart-icon").click({ force: true });
    cy.get(".a-color-base > .a-truncate > .a-truncate-cut")
    .should("contain",value);
  }
  deleteItem() {
    cy.get(".sc-action-delete > .a-declarative > .a-color-link").click();
  }
  cartItemCount() {
    cy.get("#nav-cart-count").click().should("contain", 0);
  }
}

module.exports = new homePageEle();
