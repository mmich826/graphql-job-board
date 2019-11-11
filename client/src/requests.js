const endpointUrl = 'http://localhost:9000/graphql';

export async function loadJobs() {
    const query = `
    {
      jobs {
        id
        title
        company {
          id
          name
        }
      }
    }`;

    const {jobs} = await graphqlReq(query);
    return jobs;
};

export async function loadJob(id) {
    const query =
    `
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
    }`;

    const {job} = await graphqlReq(query, {id});
    return job;
};

export async function loadCompany(id) {
    const query =
    `
    query CompanyQuery($id:ID!) {
      company(id: $id) {
        id,
        name,
        description,
        jobs {
          title,
          description
        }
      }
    }`;

    const {company} = await graphqlReq(query, {id});
    return company;
};

export async function graphqlReq(query, variables={}) {
    const resp = await fetch(endpointUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query, variables})
    });
    const respBody = await resp.json();
    if (respBody.errors) {
        const message = respBody.errors.map((error) => error.message).join('\n');
        throw new Error(message);
    }
    return respBody.data;
};
