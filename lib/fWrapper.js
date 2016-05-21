import λ from 'apex.js';

const defaultUndefinedValue = (val, defaultValue = undefined) => (
  val !== undefined ?
    val :
    defaultValue
);

export default f => λ(async (event) => {
  try {
    const response = await f(event);

    /* Add Allow origins headers */
    response.headers = defaultUndefinedValue(response.headers, {});
    response.headers['Access-Control-Allow-Origin'] = '*';

    return response;
  } catch (err) {
    console.log(err.stack);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        err,
      }),
    };
  }
});
