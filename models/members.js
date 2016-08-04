
module.exports = {
  getList: function (db) {
    return db('test_members as m')
      .select('m.id', 'm.fullname', 'm.username', 'g.name as group_name')
      .leftJoin('test_groups as g', 'g.id', 'm.group_id')
      .orderBy('m.fullname');
  },

  getGroups: function (db) {
    return db('test_groups')
      .select();
  },

  save: function (db, member) {
    return db('test_members')
      .insert(member);
  },

  detail: function (db, id) {
    return db('test_members')
      .select('id', 'fullname', 'username',
      'group_id')
      .where('id', id);
  },

  update: function (db, member) {
    return db('test_members')
      .where('id', member.id)
      .update({
        group_id: member.group_id,
        fullname: member.fullname
      });
  },

  remove: function (db, id) {
    return db('test_members')
      .where('id', id)
      .del();
  }

}