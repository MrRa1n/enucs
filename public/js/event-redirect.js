const eventFormElem = document.getElementById('eventForm');
const yearFieldElem = document.getElementById('year');
const termFieldElem = document.getElementById('term');

eventFormElem.onsubmit = () => {
    let year = yearFieldElem.value;
    let term = termFieldElem.value;

    window.location.assign(`/events/${year}/${term}`);
    return false; //Don't continue with form submit
};
