# There are API tests in this repository.

### Ok, so now we are ready to set up the project. In the first step run the terminal

### Install Dependencies for Cypress

### Create npm package:

### Run

```
mkdir cypress_berkeley_challenge
 cd cypress_berkeley_challenge
```

### Create npm package:

```
npm init -y
```

### Now install Cypress:

```
npm install --sav-dev cypress`
```

### It will start Cypress and create a cypress folder.

```
 npx cypress open
```

# Before running the code, please use the Token in the file cypress.json

```
{
  "env": {
    "token": "Bearer (Valid Token)",
    "invalid_token": "Bearer (Invalid Token)",
    "empty_token": ""
  }
}
```

## In the test 4.2 Valid phone - Canada - 10 digits => I opened a bug

- 1. 16 digits Canadian phone is not accepted,
- 2.  Incorrect error message for phone number length

The documentation states Required, 16 digits max. But the pass test requires a maximum of 10, after entering one more number I get the error "Invalid parameter (s)". I am thinking this is a bug or typo in documentation.

# Scenarios

### 1. Successful_requests

- 1.1 Valid token

### 2. Authorization invalid toke

- 2.1 Invalid token
- 2.2 Empty token
- 2.3 Missing token

### 3. Validation (name, last name, date of birth, programId)

- 3.1 Valid first name, last Name, date of birth
- 3.2 Invalid first name
- 3.3 Invalid last name
- 3.4 Invalid date of birth
- 3.5 Valid program id
- 3.6 Long program id

### 4. Validation (city, phone, email, address1)

- 4.1 Valid phone - US - 10 digits
- 4.2 Valid phone - Canada - 10 digits (country, state, postal_code, phone)
- 4.3 Long phone - US (country, state, postal_code, phone)
- 4.4 Long phone - Canada (country, state, postal_code, phone)
- 4.5 Valid city, phone (city, phone, address1)
- 4.6 Valid email
- 4.7 Invalid email
- 4.8 Invalid city
- 4.9 Invalid address1

### 5. Validation (country, state, postal code)

- 5.1 Valid country code - US
- 5.2 Valid country code - Canada (country, state, postal_code)
- 5.3 Invalid country code
- 5.4 Invalid state - Canada (country, state, postal_code)
- 5.5 Invalid state - US (country, state)
- 5.6 Invalid postal code - Canada (country, state, postal_code)
- 5.7 Invalid state (ONTARIO) - US (country, state)
