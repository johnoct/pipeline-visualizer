Pipeline Visualization
======================

A React application that visualizes Tekton Pipelineruns, displaying the sequence of tasks and their corresponding YAML specifications.

Table of Contents
-----------------

- [Pipeline Visualization](#pipeline-visualization)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation and Setup](#installation-and-setup)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

Features
--------

*   Visualizes Pipelinerun tasks using D3
*   Shows the YAML spec of the tasks on hover
*   Modern and user-friendly UI with Material Design

Installation and Setup
----------------------

To get started, clone the repository:

bash

```bash
git clone https://github.com/yourusername/pipeline-visualization.git
```

Navigate to the project directory:

bash

```bash
cd pipeline-visualization
```

Install the required dependencies:

bash

```bash
npm install
```

Start the development server:

bash

```bash
npm start
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

Usage
-----

1.  Open the application in your browser.
2.  Paste your Pipelinerun YAML into the input box.
3.  The application will automatically render the pipeline visualization.

Contributing
------------

If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch with a descriptive name.
3.  Make your changes and commit them to your branch.
4.  Create a pull request with a detailed description of your changes.

License
-------

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
