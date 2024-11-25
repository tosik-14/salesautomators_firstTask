const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

require('dotenv').config();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.get('/modal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/callback', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  //res.send('тест');
});

app.post('/create-job', async (req, res) => {
  const jobData = req.body; 

  try {
    const pipedriveApiToken = process.env.PIPEDRIVE_API_TOKEN;
    //console.log("api " + pipedriveApiToken);

    const response = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${pipedriveApiToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        title: `Job: ${jobData.firstName} ${jobData.lastName}`,
        value: jobData.jobValue || 3456, 
        org_id: jobData.organizationId || null, 
        c6c910798b3b19481ac5279c7b6b42596386005c: jobData.email || null,
        expected_close_date: jobData.endDate || null,

        "5c1fc47e511db099c2a3019cc30899bfbd08b5f2": jobData.jobType || null,
        "ff84883965885d8bdb5784942ba3dd039ecfb950": `${jobData.address}, ${jobData.city}, ${jobData.state}, ${jobData.zipCode}` || null, 
        "4302573b48618fc48c759fb5b13fbfc4371dcf5e": `${jobData.startDate}` || null, 
        "4e5e004c9e718de15effa9ba64e0e969fdf5ab47": `${jobData.startTime}` || null,
        "ebe676e818e5235ea0ec9e418d4ed61225f5cdc0": `${jobData.endTime}` || null
      }),
    });

    const result = await response.json();

    if (response.ok) {
      res.json({ success: true, deal: result.data });

    } else {
      res.status(400).json({ success: false, error: result });
    }
  } catch (err) {

    console.error('Error creating job:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.listen(PORT, () => {
  //console.log(`server running`);
});




/*cd /d E:\TestTasksAndPractice\salesautomators\firstTask*/

