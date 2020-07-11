import './styles.css';

const THROTTLE = "throttle";
const DEBOUNCE = "debounce";
const inputs = { throttle: "", debounce: "" };
const timers = { throttle: false, debounce: false };
const callsCount = { throttle: 0, debounce: 0 };
const outputElemRefs = {
    throttle: document.getElementById("throttleOutput"),
    debounce: document.getElementById("debounceOutput")
}
const callsElemRefs = {
    throttle: document.getElementById("throttleCalls"),
    debounce: document.getElementById("debounceCalls")
}

const reverseString = ({ inputText, type }) => {
    let url = "";
    // url = `http://localhost:8000/reversestring?data=${inputText}`; //comment for production
    window.fetch(url || `/reversestring?data=${inputText}`).then(response => response.json()).then(({ data }) => {
        outputElemRefs[type].textContent = data;
        callsElemRefs[type].textContent = callsCount[type];
    });
}

const debounce = ({ inputText, delay }) => {
    clearTimeout(timers[DEBOUNCE]);
    timers[DEBOUNCE] = setTimeout(() => {
        callsCount[DEBOUNCE]++;
        reverseString({ inputText, type: DEBOUNCE });
    }, delay);
}

const throttle = ({ inputText, delay }) => {
    if (!timers[THROTTLE]) {
        callsCount[THROTTLE]++;
        reverseString({ inputText, type: THROTTLE });
        timers[THROTTLE] = true;
        setTimeout(() => {
            timers[THROTTLE] = false;
        }, delay);
    }
}

const inputEventHandler = (event, type) => {
    const inputText = event.target.value.trim();
    if (inputText !== inputs[type]) {
        inputs[type] = inputText;
        if (type === THROTTLE) {
            throttle({ inputText, delay: 1000 });
        } else if (type === DEBOUNCE) {
            debounce({ inputText, delay: 1000 });
        }
    }
}

// app exports
window.app = { inputEventHandler };