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

# Scenarios

1. Authorization Positive test + Create new cardholder

- 1.1 Valid token

2. Successful requests

- 1.1 Invalid token
- 1.2 Empty token
- 1.3 Missing token

2. Create cardholder - missing parameters

- 2.1 Missing Name
- 2.1 Missing Last Name
- 2.2 Missing program_id

3. Fields validation

- 3.1 Name validation
- 3.2 Email validation
- 3.3 Country validation

4. Authorization negative test

- 4.1 Invalid token
- 4.2 Empty token
- 4.3 Missing token
