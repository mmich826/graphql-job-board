const db = require('./db');

const Query = {
    jobs: () => {
        return db.jobs.list();
    },
    job: (root, {id}) => {
        return db.jobs.get(id);
    },
    company: (root, {id}) => {
        return db.companies.get(id);
    }
};

const Company = {
    jobs: (company) => {
        return db.jobs.list().filter( (job) => job.companyId === company.id);
    }
}

const Job = {
    company: (job) => {
        return db.companies.get(job.companyId);
    }
}

const Mutation = {
    createJob: (root, {input}) => {
        const id =  db.jobs.create(input);
        return db.jobs.get(id);
    }
}

module.exports = { Query, Mutation, Company, Job }
