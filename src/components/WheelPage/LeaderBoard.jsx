import React from "react";
import styles from "./LeaderBoard.module.css";
import gold from "@/assets/icons/medals/gold.png";
import silver from "@/assets/icons/medals/silver.png";
import bronze from "@/assets/icons/medals/bronze.png";
import trophy from "@/assets/icons/medals/trophy.png";

const donors = [
  {
    rank: 1,
    name: "Impact Bridge",
    donations: 720,
    worth: "$25,600.00",
    profilePic: "https://avatar.iran.liara.run/public/37",
    medal: gold,
    styleId: "first",
  },
  {
    rank: 2,
    name: "Bright Path",
    donations: 635,
    worth: "$20,450.75",
    profilePic: "https://avatar.iran.liara.run/public/73",
    medal: silver,
    styleId: "second",
  },
  {
    rank: 3,
    name: "Kindspire",
    donations: 580,
    worth: "$18,320.45",
    profilePic: "https://avatar.iran.liara.run/public/12",
    medal: bronze,
    styleId: "third",
  },
  {
    rank: 4,
    name: "Hope Alliance",
    donations: 490,
    worth: "$15,100.10",
    profilePic: "https://avatar.iran.liara.run/public/80",
    medal: null,
    styleId: null,
  },
  {
    rank: 5,
    name: "Charity Hub",
    donations: 460,
    worth: "$13,800.50",
    profilePic: "https://avatar.iran.liara.run/public/52",
    medal: null,
    styleId: null,
  },
  {
    rank: 6,
    name: "Future Generations",
    donations: 430,
    worth: "$12,500.30",
    profilePic: "https://avatar.iran.liara.run/public/64",
    medal: null,
    styleId: null,
  },
  {
    rank: 7,
    name: "Helping Hands",
    donations: 400,
    worth: "$11,200.75",
    profilePic: "https://avatar.iran.liara.run/public/72",
    medal: null,
    styleId: null,
  },
  {
    rank: 8,
    name: "Community First",
    donations: 370,
    worth: "$10,000.00",
    profilePic: "https://avatar.iran.liara.run/public/31",
    medal: null,
    styleId: null,
  }
];

export default function LeaderBoard() {
  return (
    <div className={styles.LeaderBoard}>
      <div className={styles.leaderBoardSpecialContainer}>
        <img src={trophy} className={styles.trophyImage} alt="Trophy" />
        <div className={styles.leaderBoardContainer}>
          <div className={styles.title}>Top Corporate Donors</div>
          <div className={styles.donorList}>
            {donors.map((donor, index) => (
              <div
                className={styles.donor}
                id={donor.styleId ? styles[donor.styleId] : null}
                key={index}
              >
                <div className={styles.rank}>{donor.rank}</div>
                <div className={styles.profilePicture}>
                  {donor.medal && (
                    <img src={donor.medal} className={styles.medalImage} alt="Medal" />
                  )}
                  <img
                    src={donor.profilePic}
                    alt="Profile Placeholder"
                    className={styles.profileImage}
                    id={donor.styleId ? styles[donor.styleId] : null}
                  />
                </div>
                <div className={styles.donorInfo}>
                  <div className={styles.donorName}>
                    {donor.name} has got
                    <span
                      className={styles.numberGifts}
                      id={donor.styleId ? styles[`${donor.styleId}Text`] : null}
                    >
                      {" "}
                      {donor.donations}
                    </span>{" "}
                    Donations
                  </div>
                  <div
                    className={styles.donorWorth}
                    id={donor.styleId ? styles[`${donor.styleId}Worth`] : null}
                  >
                    worth total {donor.worth}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.userMotivation}>It's your turn!</div>
          <div className={styles.leaderBoardButton}>
            <button>Pick Your Donation Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
