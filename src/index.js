import './styles.css';

const THROTTLE = "throttle";
const DEBOUNCE = "debounce";
let throttleVal, debounceVal;

const throttleOutputEle = document.getElementById("throttleOutput");
const debounceOutputEle = document.getElementById("debounceOutput");

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
        case THROTTLE: throttleOutputEle && (throttleOutputEle.textContent = data); break;
        case DEBOUNCE: debounceOutputEle && (debounceOutputEle.textContent = data); break;
        default: { console.log("pass a valid type") }
    }
}

const inputEventHandler = (event, type) => {
    const data = event.target.value.trim();
    if (data && (data.length > 1)) {
        if ((type === THROTTLE) && (data !== throttleVal)) {
            throttleVal = data;
            reverseString({ data, type });
            // throttle call
        } else if ((type === DEBOUNCE) && (data !== debounceVal)) {
            debounceVal = data;
            reverseString({ data, type });
            // debounce call
        }
    } else {
        updateScreen({ data, type });
    }
}

// app exports
window.app = { inputEventHandler };