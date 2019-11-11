const endpointUrl = 'http://localhost:9000/graphql';

export async function loadJobs() {
    const resp = await fetch(endpointUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `
            {
              jobs {
                id
                title
                company {
                  id
                  name
                }
              }
            }`
        })
    });

    const respBody = await resp.json();
    return respBody.data.jobs;
};

export async function loadJob(id) {
    const resp = await fetch(endpointUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `
            query JobQuery($id:ID!) {
              job(id: $id) {
                id,
                title,
                description,
                company {
                  id,
                  name
                }
              }
            }`,
            variables: {id}
        })
    });

    const respBody = await resp.json();
    return respBody.data.job;
};

export async function graphqlReq(query, variables={}) {
    const resp = await fetch(endpointUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(query, variables)
    });
    const respBody = await resp.json();
    return respBody.data;
};
