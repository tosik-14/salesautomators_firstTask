document.getElementById('job-form').addEventListener('submit', async (event) => {
  event.preventDefault(); 

  //const serverLink = process.env.SERVER_LINK;
  //console.log('link ', serverLink);


  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => (data[key] = value)); 

  console.log('form data ', data);

  try {
    const response = await fetch("https://salesautomators-firsttask.onrender.com/create-job", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('error creating job');

    const result = await response.json();
    alert(`job created successfully`);

  } catch (error) {
    console.error('error:', error);
    alert('create job failed');
  }
});
