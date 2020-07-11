import './styles.css';

const reverseString = ({ data, type }) => {
    let url = "";
    // url = `http://localhost:8000/reversestring?data=${data}`; //comment for production
    window.fetch(url || `/reversestring?data=${data}`).then(response => response.json()).then(({ data }) => {
        if (data) {
            updateScreen({ data, type });
        }
    });
}

const updateScreen = ({ data, type }) => {
    switch (type) {
        case "throttle": throttleOutput && (throttleOutput.textContent = data); break;
        case "debounce": debounceOutput && (debounceOutput.textContent = data); break;
        default: { console.log("pass a valid type") }
    }
}

const inputEventHandler = eventData => {
    const type = eventData.target.dataset.type;
    let data = event.target.value;
    if (data && (data.length > 1)) {
        data = data.trim();
        if ((type === THROTTLE) && (data !== window.currThrottleVal)) {
            window.currThrottleVal = data;
            reverseString({data, type});
            // throttle call
        } else if ((type === DEBOUNCE) && (data !== window.currDebounceVal)) {
            window.currDebounceVal = data;
            reverseString({data, type});
            // debounce call
        }
    } else {
        updateScreen({data, type})
    }
}

// Input elements
const throttleInput = document.getElementById("throttleInput");
const debounceInput = document.getElementById("debounceInput");

// Ouput elements
const throttleOutput = document.getElementById("throttleOutput");
const debounceOutput = document.getElementById("debounceOutput");

// Input Listeners
throttleInput && throttleInput.addEventListener("keyup", inputEventHandler);
debounceInput && debounceInput.addEventListener("keyup", inputEventHandler);

// other declarations 
const THROTTLE = "throttle";
const DEBOUNCE = "debounce";