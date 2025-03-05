# sumSRF

Summary of the article on the SRF website

## Installation and Setup

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed.
- Ensure you have [Ollama](https://www.ollama.com/) installed and configured with Llama 3.2.

### Steps to Install and Run `app.js`

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Maenuel/sumSRF.git
    cd sumSRF/sumSRFOllama
    ```

2. **Install the dependencies:**

    ```sh
    npm install
    ```

3. **Run the application:**

    ```sh
    node app.js
    ```

## Chrome Extension Installation

To add the `chrome-extension1` to your Chrome browser, follow these steps:

1. **Open Chrome and navigate to the Extensions page:**

    - Click on the three dots in the upper right corner of Chrome.
    - Go to `More tools` > `Extensions`.
    - Alternatively, you can navigate directly to `chrome://extensions/`.

2. **Enable Developer Mode:**

    - In the Extensions page, toggle the `Developer mode` switch on the top right corner.

3. **Load the unpacked extension:**

    - Click on the `Load unpacked` button.
    - Navigate to the `chrome-extension1` directory within the `sumSRF` repository.
    - Select the folder to load the extension.

4. **Verify the extension:**

    - Ensure that the `chrome-extension1` is listed among your extensions and is enabled.

## Notes

- Ollama with Llama 3.2 is required for this project. Follow the [Ollama documentation](https://www.ollama.com/docs) to install and configure it correctly.
- Make sure to configure any necessary environment variables as described in the `app.js` file.
