## How to Setup PyTest for Backend Testing
1. Install PyTest using the following command:

        pip install pytest

2. Confirm the installation using the following command:

        python3 -m pip show pytest

3. You may get a warning that says, "WARNING: The scripts py.test and pytest are installed in '/u/k/l/klesavich/.local/bin' which is not on PATH. Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location." or something similar with your CS username. If this is the case, run the following command using your CS username information:

        export PATH="/u/k/l/klesavich/.local/bin:$PATH"

## How to Run PyTest for Backend Testing
1. To run PyTest tests, use the following command:

        pytest

2. If you are testing the backend, make sure the MySQL server is running so you don't get an error


## How to Write a PyTest
(https://circleci.com/blog/testing-flask-framework-with-pytest/)
