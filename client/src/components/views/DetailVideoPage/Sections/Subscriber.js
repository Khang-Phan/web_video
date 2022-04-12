import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sections.css";
import { useSelector } from "react-redux";
function Subscriber(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;
  const user = useSelector((state) => state.user);
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribeVariables = {
      userTo: userTo,
      userFrom: userFrom,
    };

    if (user.userData && !user.userData.isAuth) {
      return alert("You must Login! ");
    } else {
      if (userFrom == userTo) {
        return alert("You do not subscribe your video! ");
      } else {
        if (Subscribed) {
          //when we are already subscribed
          axios
            .post("/api/subscribe/unSubscribe", subscribeVariables)
            .then((response) => {
              if (response.data.success) {
                setSubscribeNumber(SubscribeNumber - 1);
                setSubscribed(!Subscribed);
              } else {
                alert("Failed to unsubscribe");
              }
            });
        } else {
          // when we are not subscribed yet

          axios
            .post("/api/subscribe/subscribe", subscribeVariables)
            .then((response) => {
              if (response.data.success) {
                setSubscribeNumber(SubscribeNumber + 1);
                setSubscribed(!Subscribed);
              } else {
                alert("Failed to subscribe");
              }
            });
        }
      }
    }
  };

  useEffect(() => {
    const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom };
    axios
      .post("/api/subscribe/subscribeNumber", subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert("Failed to get subscriber Number");
        }
      });

    axios
      .post("/api/subscribe/subscribed", subscribeNumberVariables)
      .then((response) => {
        if (response.data.success) {
          setSubscribed(response.data.subcribed);
        } else {
          alert("Failed to get Subscribed Information");
        }
      });
  }, []);

  return (
    <div>
      <button
        onClick={onSubscribe}
        className="button_sub"
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
        }}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
      )
    </div>
  );
}

export default Subscriber;
