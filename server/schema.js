type Query {
    jobs: [Job]
    job(id: ID!) : Job
}

type Job {
    id: ID!
    title: String
    description: String
    company: Company
}

type Company {
    id: ID!
    name: String
    description: String
}
