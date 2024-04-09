## How to Setup PyTest for Backend Testing
Note: This information is for installing PyTest on the CSL machines.

1. Install PyTest using the following command:

        pip install pytest

2. Confirm the installation using the following command:

        python3 -m pip show pytest

3. You may get a warning that says, "WARNING: The scripts py.test and pytest are installed in '/u/k/l/klesavich/.local/bin' which is not on PATH. Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location," or something similar with your CS username information. If this is the case, run the following command using your CS username information:

        export PATH="/u/k/l/klesavich/.local/bin:$PATH"

Replace the 'k' with the letter of your first name, replace the 'l' with the letter of your last name, and replace 'klesavich' with your CS username.

## How to Run PyTest for Backend Testing
Note: This information is for running PyTest on the CSL machines.

1. To run PyTest tests, use the following command:

        pytest

2. If you are testing the backend, make sure the MySQL server is running so you don't get an error.

3. If you get an error that says, "Command 'pytest' not found, did you mean:," and it lists a bunch of additional commands, try running the following command again using your CS username information:

        export PATH="/u/k/l/klesavich/.local/bin:$PATH"

You might have to run this command each time you log back into the CSL machines, but after running it once, pytest should work for the remainder of your session.

## How to Write a PyTest
Here are a few articles that might provide some insight into writing tests with PyTest:

* Testing a Flask framework with Pytest [https://circleci.com/blog/testing-flask-framework-with-pytest/]
* Stack Overflow Post on How to PyTest a Flask Endpoint: [https://stackoverflow.com/questions/65881106/how-to-pytest-a-flask-endpoint]
* Flask Documentation on Testing Flask Applications: [https://flask.palletsprojects.com/en/1.1.x/testing/]
