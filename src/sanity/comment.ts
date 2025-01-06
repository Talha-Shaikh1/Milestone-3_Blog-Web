const comments = {
  name: 'comment',
  type: 'document',
  title: 'Comment',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'comment', type: 'text', title: 'Comment' },
    {
      name: 'post',
      type: 'reference',
      to: [{ type: 'blogPost' }],
    },
    { name: 'approved', type: 'boolean', title: 'Approved', default: false },
  ],
};

export default comments;