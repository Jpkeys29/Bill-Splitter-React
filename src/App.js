import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App(initialFriends) {
  const [friends, setFriends] = useState(initialFriends=[]);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend () {
    setShowAddFriend((show) => !show); 
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend} >{showAddFriend ? 'Close' : 'Add friend'}</Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendList({friends}) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (<Friend friend={friend} key={friend.id} />))}
      </ul>
    </div>
  )
}

function Friend ({friend}) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (<p className="red" >You owe {friend.name} {Math.abs(friend.balance)} 💵 </p>)}
      {friend.balance > 0 && (<p className="green">{friend.name}  owes you {Math.abs(friend.balance)} 💵 </p>)}
      {friend.balance === 0 && (<p>You and {friend.name} are even </p>)}

      <Button>Select</Button>

    </li>
  ) 
}

function Button ({children, onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>;
}

function FormAddFriend () {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if(!name || !image) return;

    const newFriend = {
      name,
      image,
      balance: 0,
      id: crypto.randomUUID(),
    };

    console.log(newFriend);
  }
  return (
    <form className="form-add-friend">
      <label>👫Friend name</label>   
      <input 
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)} />
      <label>🌄Image URL</label>
      <input 
      type="text"
      value={image}
      onChange={(e) => setImage(e.target.value)} />
      <Button>Add</Button>

    </form>
  );
}

function FormSplitBill () {
  return (
    <form className="form-split-bill">
      <h2>Split bill with friend</h2>
      <label>💸Bill value</label>
      <input type="text"></input>
      <label>💵Your expense</label>
      <input type="text"></input>
      <label>👫Friend's expense</label>
      <input type="text" disabled></input>
      <label>👉Who is paying the bill?🤔</label>
        <select>
          <option value="user">You</option>
          <option value="friend">Friend</option>
        </select>
      <Button>Split bill</Button>
    </form>
  );
}

