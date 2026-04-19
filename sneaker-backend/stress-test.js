const autocannon = require("autocannon");

const instance = autocannon(
  {
    url: "http://localhost:3001/api/v1/reservation",
    connections: 15,
    duration: 5,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },

    setupClient: (client) => {
      client.setBody(
        JSON.stringify({
          productId: "27d39965-b6ec-4df8-b618-b087f798013c",
          clientId: crypto.randomUUID(),
          userName: `StressTester_${Math.floor(Math.random() * 1000)}`,
        }),
      );
    },
  },
  (err, result) => {
    if (err) console.error(err);
    console.log("Test Completed!");
  },
);

// লাইভ আউটপুট দেখার জন্য
autocannon.track(instance, {renderProgressBar: true});
