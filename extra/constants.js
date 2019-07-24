export const permissions= {
    'getUsers': {
        all: ['head-trainer'],
        read : ['trainee', 'trainer'],
        write : ['trainer'],
        delete: [],
    }
}

export const users =[
    { traineeEmail: 'trainee@successive.tech',
      reviewerEmail: 'reviewer1@successive.tech'
    },
    {
      traineeEmail: '*trainee2@successive.tech',
      reviewerEmail: 'reviewer21@successive.tech'
    },
    {
      traineeEmail: 'trainee@successive22.tech',
      reviewerEmail: '%reviewer1@successive.tech'
    }
]
  