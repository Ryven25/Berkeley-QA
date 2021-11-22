describe("Card Holder POST API tests", () => {
  Cypress.config(
    "baseUrl",
    "https://api.staging.pungle.co/api/v1/card_issuing/cardholders"
  );

  const headers = {
    Authorization: Cypress.env("token"),
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const validation_first_name = {
    program_id: 31,
    external_tag: "abc123",
    first_name: "5ã %",
    last_name: "Doe",
    date_of_birth: "01-01-1980",
    email: "user@fakedomain.com",
    phone: "1231231234",
    postal_code: "84121",
    city: "Moonbase One",
    state: "UT",
    address1: "123 Fake Street",
    address2: "apartment 2",
    country: "840",
    sin: "",
    shipping_method: "1",
    load_amount: 100,
  };

  const validation_email = {
    program_id: 31,
    external_tag: "abc123",
    first_name: "John",
    last_name: "Doe",
    date_of_birth: "01-01-1980",
    email: "user._-+fakedomain.com",
    phone: "1231231234",
    postal_code: "84121",
    city: "Moonbase One",
    state: "UT",
    address1: "123 Fake Street",
    address2: "apartment 2",
    country: "840",
    sin: "",
    shipping_method: "1",
    load_amount: 100,
  };

  const validation_country = {
    program_id: 31,
    external_tag: "abc123",
    first_name: "John",
    last_name: "Doe",
    date_of_birth: "01-01-1980",
    email: "user@fakedomain.com",
    phone: "1231231234",
    postal_code: "84121",
    city: "Moonbase One",
    state: "UT",
    address1: "123 Fake Street",
    address2: "apartment 2",
    country: "89ÛÞßç$&",
    sin: "",
    shipping_method: "1",
    load_amount: 100,
  };

  it("Validation first name test", () => {
    cy.request({
      method: "POST",
      url: "/",
      headers: headers,
      body: validation_first_name,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(400);
      expect(response.body.error).to.have.property(
        "code",
        "invalid_cardholder"
      );

      expect(response.body.error).to.have.property(
        "message",
        "Invalid field(s) in Cardholder Object"
      );
    });
  });

  it("Validation email test", () => {
    cy.request({
      method: "POST",
      url: "/",
      headers: headers,
      body: validation_email,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(400);
      expect(response.body.error).to.have.property(
        "code",
        "invalid_cardholder"
      );

      expect(response.body.error.field_errors[0].position).to.include("email");
    });
  });

  it("Validation country test", () => {
    cy.request({
      method: "POST",
      url: "/",
      headers: headers,
      body: validation_country,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(400);
      expect(response.body.error).to.have.property(
        "code",
        "invalid_cardholder"
      );

      expect(response.body.error.field_errors[0].position).to.include(
        "country"
      );
    });
  });
});
