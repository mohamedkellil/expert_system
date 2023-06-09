/*let password = prompt('entrez le mote de pass');
if(password = 'mohamed123'){*/


// Rules for diagnosing medical conditions
let rules = [
    {
      name: 'Common cold',
      symptoms: ['runny nose', 'sore throat', 'cough']
    },
    {
      name: 'Flu',
      symptoms: ['fever', 'body aches', 'fatigue']
    },
    {
      name: 'COVID-19',
      symptoms: ['fever', 'cough', 'shortness of breath']
    },
    {
      name: 'Allergies',
      symptoms: ['runny nose', 'itchy eyes', 'sneezing']
    },
    {
      name: 'Allergies complique',
      symptoms: ['tempertature > 38', 'itchy eyes', 'sneezing', 'cough']
    }
  ];
  
  // Ask user about their symptoms
  function askSymptoms() {
    let symptomList = document.getElementById('symptoms');
    symptomList.innerHTML = '';
    for (let i = 0; i < rules.length; i++) {
      let symptoms = rules[i].symptoms;
      for (let j = 0; j < symptoms.length; j++) {
        let symptom = symptoms[j];
        if (!document.getElementById(symptom)) {
          let li = document.createElement('li');
          let label = document.createElement('label');
          let input = document.createElement('input');
          input.type = 'checkbox';
          input.id = symptom;
          label.htmlFor = symptom;
          label.textContent = symptom;
          li.appendChild(input);
          li.appendChild(label);
          symptomList.appendChild(li);
        }
      }
    }
  }
  
 // Check if the symptoms match any conditions
function checkSymptoms() {
    let matches = [];
    for (let i = 0; i < rules.length; i++) {
      let symptoms = rules[i].symptoms;
      let match = true;
      for (let j = 0; j < symptoms.length; j++) {
        let symptom = symptoms[j];
        if (!document.getElementById(symptom).checked) {
          match = false;
          break;
        }
      }
      if (match) {
        matches.push(rules[i].name);
      }
    }
    
    // Check if the symptoms match the new rule
    let newRule = rules[rules.length - 1];
    let newMatch = true;
    for (let i = 0; i < newRule.symptoms.length; i++) {
      let symptom = newRule.symptoms[i];
      if (!document.getElementById(symptom).checked) {
        newMatch = false;
        break;
      }
    }
    if (newMatch) {
      matches.push(newRule.name);
    }
    
    return matches;
  }
  
  
  // Update the results table
  function updateTable() {
    let matches = checkSymptoms();
    let table = document.getElementById('table');
  
    // Clear table rows
    table.innerHTML = '';
  
    // Add table headers
    let headers = ['Condition'];
    let headerRow = document.createElement('tr');
    for (let i = 0; i < headers.length; i++) {
      let th = document.createElement('th');
      th.textContent = headers[i];
      headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
  
    // Add table rows
    for (let i = 0; i < matches.length; i++) {
      let row = document.createElement('tr');
      let td = document.createElement('td');
      td.textContent = matches[i];
      row.appendChild(td);
      table.appendChild(row);
    }
  }
  
  // Add event listeners to buttons and input fields
  document.getElementById('start').addEventListener('click', askSymptoms);
  document.getElementById('check').addEventListener('click', updateTable);
  document.getElementById('reset').addEventListener('click', function() {
    location.reload();
  });
  
  document.getElementById('add-rule-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let nameInput = document.getElementById('rule-name');
    let symptomInput = document.getElementById('rule-symptoms');
    let name = nameInput.value.trim();
    let symptoms = symptomInput.value.trim().split(',').map(symptom =>symptom.trim());
    let symptomList = symptomInput.value.trim().split(',').map(symptom => symptom.trim());
    if (symptomList.length === 0 || name === '') {
  alert('Please enter at least one symptom.');
  return;
}

let newRule = {
  name: name,
  symptoms: symptoms
};



// Add the new rule to the rules array
rules.push(newRule);

// Save the updated rules to local storage
saveRules();

// Clear the form and show success message
document.getElementById('add-rule-form').reset();
alert('Rule added!');
});


// Save the rules to local storage
function saveRules() {
    localStorage.setItem('rules', JSON.stringify(rules));
  }
  
// Load the rules from local storage
  function loadRules() {
    let savedRules = localStorage.getItem('rules');
    if (savedRules) {
      rules = JSON.parse(savedRules);
    }
  }
  // Call the loadRules function when the page loads
  window.addEventListener('load', loadRules); 

/* /////////////////////////////////////// */ 

  // Retrieve the rules from local storage
const rules2 = JSON.parse(localStorage.getItem('rules')) || [];

// Populate the "Select a rule to modify" dropdown list with the rule names
const ruleSelect = document.getElementById('rule-select');
rules2.forEach(rule => {
  const option = document.createElement('option');
  option.textContent = rule.name;
  ruleSelect.appendChild(option);
});

// Update rule function
function modifyRule() {
  const ruleSelect = document.getElementById('rule-select');
  const ruleName = ruleSelect.value;
  const newRuleName = document.getElementById('new-rule-name').value;
  const newRuleSymptoms = document.getElementById('new-rule-symptoms').value;

  // Find the selected rule in the rules array
  const selectedRule = rules2.find(rule => rule.name === ruleName);

  if (selectedRule) {
    // Update the rule name and symptoms
    selectedRule.name = newRuleName;
    selectedRule.symptoms = newRuleSymptoms.split(',').map(symptom => symptom.trim());

    // Update the rule in local storage
    localStorage.setItem('rules', JSON.stringify(rules2));

    // Clear the form inputs
    ruleSelect.selectedIndex = 0;
    document.getElementById('new-rule-name').value = '';
    document.getElementById('new-rule-symptoms').value = '';

    alert('Rule updated successfully!');
  } else {
    alert('Please select a rule to modify!');
  }
}

// Add event listener to the "Update Rule" button
const modifyRuleBtn = document.getElementById('modify-rule-btn');
modifyRuleBtn.addEventListener('click', modifyRule);

/*/////////////////////////////*/
function populateSymptomSelect() {
  const rules3 = JSON.parse(localStorage.getItem('rules')) || [];
  const symptoms = new Set();

  // Iterate over all rules and add their symptoms to the set
  rules3.forEach(rule => {
    rule.symptoms.forEach(symptom => symptoms.add(symptom));
  });

  const symptomSelect = document.getElementById('symptom-select');

  // Clear the select element
  symptomSelect.innerHTML = '';

  // Add an empty option
  const emptyOption = document.createElement('option');
  emptyOption.textContent = 'Select a symptom';
  emptyOption.value = '';
  symptomSelect.appendChild(emptyOption);

  // Add an option for each symptom
  symptoms.forEach(symptom => {
    const option = document.createElement('option');
    option.textContent = symptom;
    option.value = symptom;
    symptomSelect.appendChild(option);
  });

  // Add event listener to delete button
  const deleteBtn = document.getElementById('delete-btn');
  deleteBtn.addEventListener('click', deleteSymptom);
}

// Delete selected symptom from all rules and update local storage
function deleteSymptom() {
  const selectedSymptom = document.getElementById('symptom-select').value;
  let rules = JSON.parse(localStorage.getItem('rules')) || [];

  // Remove selected symptom from all rules
  rules.forEach(rule => {
    const symptomIndex = rule.symptoms.indexOf(selectedSymptom);
    if (symptomIndex !== -1) {
      rule.symptoms.splice(symptomIndex, 1);
    }
  });

  // Update local storage with new rules array
  localStorage.setItem('rules', JSON.stringify(rules));

  // Refresh the symptom select dropdown
  populateSymptomSelect();
}

// Call the function to populate the symptom select element
populateSymptomSelect();

 
 
/*
}else{
  alert('mote de pass invalide');
}*/
