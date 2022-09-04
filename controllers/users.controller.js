const fs = require("fs");
const users = require("../data.json");

module.exports.getAllUsers = (req, res, next) => {
  const { limit } = req.query;
  console.log(limit);
  res
    .status(200)
    .json(users.slice(0, limit))
};

module.exports.getRandomUser = (req, res, next) => {
  const size = users.length;
  const randomNumber = Math.floor(Math.random() * size);
  res.status(200).json(users[randomNumber]);
};

module.exports.saveAUser = (req, res) => {
  const { id, gender, name, contact, address, photoUrl } = req.body;
  if(!id || !gender || !name || !contact || !address || !photoUrl) {
    return res
      .status(422)
      .json({"error": "Give all field value properly"});
  }

  const user = users.filter(user => user.id == id);
  console.log(user);
  if(user.length > 0) return res.status(500).json({
    "ErrorMessage": "User already extis with this id"
  });

  let json;

  fs.readFile('data.json', function (err, data) {
    json = JSON.parse(JSON.stringify(users))
    json.push(req.body)
    json = JSON.parse(JSON.stringify(json))


    fs.writeFile("data.json", JSON.stringify(json), function (err) {
      if(err) console.log(err);
    })

    res
      .status(201)
      .send(json);
  })

};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { gender, name, contact, address, photoUrl } = req.body;

  const user = users.filter(user => user.id == id);
  console.log(user);
  if(user.length == 0) return res.status(500).json({
    "ErrorMessage": "User not found"
  });

  const updatedUserList = users.map((user) => {
    if(user.id == id) {
      console.log(user)
      console.log({
        id,
        gender,
        name,
        contact,
        address,
        photoUrl
      })
      return {
        id,
        gender,
        name,
        contact,
        address,
        photoUrl
      }
    } else return user;
  });

  fs.writeFile("data.json", JSON.stringify(updatedUserList), function (err) {
    if(err) console.log(err);
  })

  res
    .status(201)
    .send(updatedUserList);
}

module.exports.deleteAUser = (req, res) => {
  const { id } = req.params;

  const user = users.filter(user => user.id == id);
  console.log(user);
  if(user.length == 0) return res.status(500).json({
    "ErrorMessage": "User not found"
  });

  const updatedUserList = users.filter(user => user.id != id);
  console.log(user);
  if(user.length == 0) return res.status(500).json({
    "ErrorMessage": "User not found"
  });

  fs.writeFile("data.json", JSON.stringify(updatedUserList), function (err) {
    if(err) console.log(err);
  })

  res
    .status(201)
    .send(updatedUserList);
}

//
// module.exports.getToolDetail = (req, res) => {
//   const {id} = req.params;
//   console.log(id);
//   // const filter = {_id: id};
//   const foundTool = tools.find(tool => tool.id === Number(id));
//   res.status(200).send({
//     success: true,
//     messages: "Success",
//     data: foundTool
//   });
//   // res.status(500).send({
//   //   success: false,
//   //   error: "Internal server error."
//   // });
// };
//
// module.exports.updateTool = (req, res) => {
//   // const newData = req.body;
//   const { id } = req.params;
//   const filter = { _id: id };
//
//   const newData = tools.find(tool => tool.id === Number(id));
//
//   newData.id = id;
//   newData.name = req.body.name;
//
//   res.send(newData);
//
// };
//
// module.exports.deleteTool = (req, res) => {
//   const { id } = req.params;
//   const filter = { _id: id };
//
//   tools = tools.filter(tool => tool.id !== Number(id));
//
//   res.send(tools);
// };
