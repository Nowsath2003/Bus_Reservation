document.addEventListener('DOMContentLoaded', function () {
  function createOptions(selectElement, options) {
    options.forEach(function (optionText) {
      var option = document.createElement('option');
      option.text = option.value = optionText;
      selectElement.add(option);
    });
  }

  var busRoutesSelect = document.querySelector('#bus-routes');
  var fromSelect = document.querySelector('#from');
  var toSelect = document.querySelector('#to');
  var numTicketsSelect = document.querySelector('#num-tickets');
  var dateInput = document.querySelector('#datetime');
  var mobileInput = document.querySelector('#mobile');

  createOptions(busRoutesSelect, ['', '101', '101x', '72', '55']);

  var fromOptions = {
    '101': ['Select Arrival Station', 'MGR central', 'Egmore', 'Rohini Theatre', 'Nerkundram', 'Maduravoyal VengayaMandi', 'Maduravoyal Ration Shop', 'Maduravoyal Erikarai', 'Vaanagaram', 'Poonamalae'],
    '101x': ['Select Arrival Station', 'MGR central', 'Egmore', 'Rohini Theatre', 'Nerkundram', 'Maduravoyal VengayaMandi', 'Maduravoyal Ration Shop', 'Maduravoyal Erikarai', 'Vaanagaram', 'Poonamalae', 'Thiruvallur'],
    '72': ['Select Arrival Station', 'T Nagar', 'vadapalani', 'Koyambedu', 'Rohini Theatre', 'Nerkundram', 'Maduravoyal VengayaMandi', 'Maduravoyal Ration Shop', 'Maduravoyal Erikarai', 'Vaanagaram', 'Thiruverkadu'],
    '55': ['Select Arrival Station', 'Broadway', 'MGR central', 'Rohini Theatre', 'Nerkundram', 'Maduravoyal VengayaMandi', 'Maduravoyal Ration Shop', 'Maduravoyal Erikarai']
  };

  var toOptions = {
    '101': ['Select Departure Station', 'MGR central', 'Egmore', 'Rohini Theatre', 'Nerkundram', 'Maduravoyal VengayaMandi', 'Maduravoyal Ration Shop', 'Maduravoyal Erikarai', 'Vaanagaram', 'Poonamalae'],
    '101x': ['Select Departure Station', 'MGR central', 'Egmore', 'Rohini Theatre', 'Nerkundram', 'Maduravoyal VengayaMandi', 'Maduravoyal Ration Shop', 'Maduravoyal Erikarai', 'Vaanagaram', 'Poonamalae', 'Thiruvallur'],
    '72': ['Select Departure Station', 'T Nagar', 'vadapalani', 'Koyambedu', 'Rohini Theatre', 'Nerkundram', 'Maduravoyal VengayaMandi', 'Maduravoyal Ration Shop', 'Maduravoyal Erikarai', 'Vaanagaram', 'Thiruverkadu'],
    '55': ['Select Departure Station', 'Broadway', 'MGR central', 'Rohini Theatre', 'Nerkundram', 'Maduravoyal VengayaMandi', 'Maduravoyal Ration Shop', 'Maduravoyal Erikarai']
  };

  
  createOptions(numTicketsSelect, ['', '1', '2', '3', '4', '5']);

  function updateToOptions() {
    var selectedBusRoute = busRoutesSelect.value;
    var selectedFrom = fromSelect.value;
    var availableToOptions = toOptions[selectedBusRoute] || [];
    toSelect.innerHTML = '';
    createOptions(toSelect, availableToOptions.filter(option => option !== selectedFrom));
  }


  busRoutesSelect.addEventListener('change', function () {
    fromSelect.innerHTML = ''
    createOptions(fromSelect, fromOptions[busRoutesSelect.value]);
    updateToOptions();
  });

  fromSelect.addEventListener('change', updateToOptions);

  numTicketsSelect.addEventListener('click', checkFromTo);

  function checkFromTo() {
    var selectedFrom = fromSelect.value;
    var selectedTo = toSelect.value;
    var selectedBusRoute = busRoutesSelect.value;
    if (selectedFrom == 'Select Arrival Station' || selectedTo == 'Select Departure Station' || selectedBusRoute == '') {
      alert('Please select both arrival and departure stations.');
    }

  }



  function handleSubmit() {
    var selectedBusRoute = busRoutesSelect.value;
    var selectedFrom = fromSelect.value;
    var selectedTo = toSelect.value;
    var selectedNumTickets = numTicketsSelect.value;
    var selectedDate = dateInput.value;
    var enteredMobile = mobileInput.value;

    if (selectedBusRoute == '' || selectedFrom == '' || selectedTo == '' || enteredMobile == '') {
      alert('Please enter the required details');
    }
    else if (enteredMobile.length != 10) {
      alert("Enter valid Phone number");
    }
    else if (selectedNumTickets == '0') {
      alert('Enter the number of tickets');

    }
    else {
      var ticketPrice = calculateTicketPrice(selectedFrom, selectedTo, parseInt(selectedNumTickets, 10));

      var ticketContent = `
      <div class="form">
        <h2>Your E-Ticket</h2>
        <p><strong>Bus Route:</strong> ${selectedBusRoute}</p>
        <p><strong>From:</strong> ${selectedFrom}</p>
        <p><strong>To:</strong> ${selectedTo}</p>
        <p><strong>Tickets:</strong> ${selectedNumTickets}</p>
        <p><strong>Date:</strong> ${selectedDate}</p>
        <p><strong>Mobile Number:</strong> ${enteredMobile}</p>
        <p><strong>Price:</strong> ₹${ticketPrice.toFixed(2)}</p>
        </div>`;
      handleReset();
    }
  }



  function handleReset() {
    busRoutesSelect.innerHTML = '';
    createOptions(busRoutesSelect, ['', '101', '101x', '72', '55']);
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    mobileInput.innerHTML = '';
    numTicketsSelect.innerHTML = '';
    createOptions(numTicketsSelect, ['0', '1', '2', '3', '4', '5']);
  }


  function currentdatetime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = ((now.getHours() + 11) % 12 + 1).toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  function updateDateTime() {
    document.getElementById('datetime').setAttribute('value', currentdatetime());
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  var form = document.getElementById('form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    handleSubmit();
  });
  form.addEventListener('reset', handleReset);

  function handleSubmit() {
    var selectedBusRoute = busRoutesSelect.value;
    var selectedFrom = fromSelect.value;
    var selectedTo = toSelect.value;
    var selectedNumTickets = numTicketsSelect.value;
    var selectedDate = dateInput.value;
    var enteredMobile = mobileInput.value;

    if (selectedBusRoute == '' || selectedFrom == '' || selectedTo == '' || enteredMobile == '') {
      alert('Please enter the required details');
    }
    else if (enteredMobile.length != 10) {
      alert("Enter valid Phone number");
    }
    else if (selectedNumTickets == '0') {
      alert('Enter the number of tickets');

    }
    else {
      var ticketPrice = calculateTicketPrice(selectedFrom, selectedTo, parseInt(selectedNumTickets, 10));
      var ticketInfo = document.querySelector('.ticket-info');
      var ticket = document.querySelector('.ticket');
      var downloadButton = document.getElementById('downloadButton');
      var back = document.getElementById('backButton');


      var ticketContent = `
      <div class="ticket-info">
        <h2>Your E-Ticket</h2>
        <p><strong>Bus Route:</strong> ${selectedBusRoute}</p>
        <p><strong>From:</strong> ${selectedFrom}</p>
        <p><strong>To:</strong> ${selectedTo}</p>
        <p><strong>Tickets:</strong> ${selectedNumTickets}</p>
        <p><strong>Date:</strong> ${selectedDate}</p>
        <p><strong>Mobile Number:</strong> ${enteredMobile}</p>
        <p><strong>Price:</strong> ₹${ticketPrice.toFixed(2)}</p>
        </div>`;
        ticketInfo.innerHTML = ticketContent;
        ticket.style.display = 'block';
        downloadButton.style.display = 'block';
        back.style.display = 'block';
      handleReset();
    }
  }
  document.getElementById('downloadButton').addEventListener('click', function() {
    var ticketContent = document.querySelector('.e-ticket');
    var downloadButton = document.getElementById('downloadButton');
    downloadButton.style.display = 'none';
    var back = document.getElementById('backButton');
    back.style.display = 'none';
    html2canvas(ticketContent).then(canvas => {
      var link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'e-ticket.png';
      link.click();
    });
    downloadButton.style.display = 'block';
    back.style.display = 'block';
  });

  function handleReset() {
    busRoutesSelect.innerHTML = '';
    createOptions(busRoutesSelect, ['', '101', '101x', '72', '55']);
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    mobileInput.innerHTML = '';
    numTicketsSelect.innerHTML = '';
    createOptions(numTicketsSelect, ['','0', '1', '2', '3', '4', '5']);
  }


  function calculateTicketPrice(selectedFrom, selectedTo, selectedNumTickets) {

    var pricingMatrix = {

      'Broadway': {
        'MGR central': 11,
        'Egmore': 13,
        'Rohini Theatre': 17,
        'Nerkundram': 19,
        'Maduravoyal VengayaMandi': 21,
        'Maduravoyal Ration Shop': 21,
        'Maduravoyal Erikarai': 21,
        'Vaanagaram': 23,
        'Poonamalae': 25,
        'Thiruvallur': 27

      },

      'MGR central': {
        'Broadway': 11,
        'Egmore': 11,
        'Rohini Theatre': 15,
        'Nerkundram': 17,
        'Maduravoyal VengayaMandi': 19,
        'Maduravoyal Ration Shop': 19,
        'Maduravoyal Erikarai': 19,
        'Vaanagaram': 21,
        'Poonamalae': 23,
        'Thiruvallur': 25

      },

      'Egmore': {
        'Brodway': 13,
        'MGR central': 11,
        'Rohini Theatre': 13,
        'Nerkundram': 15,
        'Maduravoyal VengayaMandi': 17,
        'Maduravoyal Ration Shop': 17,
        'Maduravoyal Erikarai': 17,
        'Vaanagaram': 19,
        'Poonamalae': 21,
        'Thiruvallur': 23
      },

      'T Nagar': {
        'vadapalani': 15,
        'Koyambedu': 19,
        'Rohini Theatre': 21,
        'Nerkundram': 23,
        'Maduravoyal VengayaMandi': 25,
        'Maduravoyal Ration Shop': 25,
        'Maduravoyal Erikarai': 25,
        'Vanagaram': 27,
        'Thiruverkadu': 29
      },

      'vadapalani': {
        'T Nagar': 15,
        'Koyambedu': 17,
        'Rohini Theatre': 15,
        'Nerkundram': 17,
        'Maduravoyal VengayaMandi': 19,
        'Maduravoyal Ration Shop': 19,
        'Maduravoyal Erikarai': 19,
        'Vanagaram': 19,
        'Thiruverkadu': 21
      },

      'Koyambedu': {
        'T Nagar': 19,
        'Vadapalani': 15,
        'Rohini Theatre': 11,
        'Nerkundram': 13,
        'Maduravoyal VengayaMandi': 17,
        'Maduravoyal Ration Shop': 17,
        'Maduravoyal Erikarai': 17,
        'Vanagaram': 29,
        'Thiruverkadu': 21
      },


      'Rohini Theatre': {
        'Brodway': 17,
        'MGR central': 15,
        'Egmore': 13,
        'T Nagar': 19,
        'vadapalani': 15,
        'Koyambedu': 11,
        'Nerkundram': 11,
        'Maduravoyal VengayaMandi': 15,
        'Maduravoyal Ration Shop': 15,
        'Maduravoyal Erikarai': 15,
        'Vaanagaram': 17,
        'Poonamalae': 19,
        'Thiruvallur': 21
      },

      'Nerkundram': {
        'Brodway': 19,
        'MGR central': 17,
        'Egmore': 15,
        'T Nagar': 21,
        'vadapalani': 17,
        'Koyambedu': 13,
        'Rohini Theatre': 11,
        'Maduravoyal VengayaMandi': 13,
        'Maduravoyal Ration Shop': 13,
        'Maduravoyal Erikarai': 13,
        'Vaanagaram': 15,
        'Poonamalae': 17,
        'Thiruvallur': 19
      },

      'Maduravoyal VengayaMandi': {
        'Brodway': 21,
        'MGR central': 19,
        'Egmore': 17,
        'T Nagar': 25,
        'vadapalani': 21,
        'Koyambedu': 17,
        'Rohini Theatre': 13,
        'Nerkundram': 11,
        'Maduravoyal Ration Shop': 11,
        'Maduravoyal Erikarai': 11,
        'Vaanagaram': 13,
        'Poonamalae': 15,
        'Thiruvallur': 17
      },

      'Maduravoyal Ration Shop': {
        'Brodway': 21,
        'MGR central': 19,
        'Egmore': 17,
        'T Nagar': 25,
        'vadapalani': 21,
        'Koyambedu': 17,
        'Rohini Theatre': 13,
        'Nerkundram': 11,
        'Maduravoyal VengayaMandi': 11,
        'Maduravoyal Erikarai': 11,
        'Vaanagaram': 13,
        'Poonamalae': 15,
        'Thiruvallur': 17
      },

      'Maduravoyal Erikarai': {
        'Brodway': 21,
        'MGR central': 19,
        'Egmore': 17,
        'T Nagar': 25,
        'vadapalani': 21,
        'Koyambedu': 17,
        'Rohini Theatre': 13,
        'Nerkundram': 11,
        'Maduravoyal VengayaMandi': 11,
        'Maduravoyal Ration Shop': 11,
        'Vaanagaram': 13,
        'Poonamalae': 15,
        'Thiruvallur': 17
      },

      'Vaanagaram': {
        'Brodway': 23,
        'MGR central': 21,
        'Egmore': 19,
        'T Nagar': 27,
        'vadapalani': 23,
        'Koyambedu': 19,
        'Rohini Theatre': 15,
        'Nerkundram': 13,
        'Maduravoyal VengayaMandi': 11,
        'Maduravoyal Ration Shop': 11,
        'Maduravoyal Erikarai': 11,
        'Poonamalae': 11,
        'Thiruvallur': 13
      },

      'Thiruverkadu': {
        'T Nagar': 29,
        'vadapalani': 25,
        'Koyambedu': 21,
        'Rohini Theatre': 17,
        'Nerkundram': 15,
        'Maduravoyal VengayaMandi': 13,
        'Maduravoyal Ration Shop': 13,
        'Maduravoyal Erikarai': 13,
        'Vanagaram': 11
      },

      'Poonamalae': {
        'Brodway': 25,
        'MGR central': 23,
        'Egmore': 21,

        'Rohini Theatre': 17,
        'Nerkundram': 15,
        'Maduravoyal VengayaMandi': 13,
        'Maduravoyal Ration Shop': 13,
        'Maduravoyal Erikarai': 13,
        'Vaanagaram': 11,
        'Thiruvallur': 13
      },

      'Thiruvallur': {
        'Brodway': 27,
        'MGR central': 25,
        'Egmore': 23,
        'Rohini Theatre': 19,
        'Nerkundram': 17,
        'Maduravoyal VengayaMandi': 15,
        'Maduravoyal Ration Shop': 15,
        'Maduravoyal Erikarai': 15,
        'Vaanagaram': 13,
        'Poonamalae': 11
      }
    };

    if (pricingMatrix[selectedFrom] && pricingMatrix[selectedFrom][selectedTo]) {
      var basePrice = pricingMatrix[selectedFrom][selectedTo];

      return basePrice * (selectedNumTickets);
    } else {
      return 0;
    }
  }


});