

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

# <center>Software Studio Assignment 2</center>

<div align="center">

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/Lewis-Tsai/Software-Studio-Assignment-02"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Lewis-Tsai/Software-Studio-Assignment-02">View Demo</a>
    ·
    <a href="https://github.com/Lewis-Tsai/Software-Studio-Assignment-02/issues">Report Bug</a>
    ·
    <a href="https://github.com/Lewis-Tsai/Software-Studio-Assignment-02/issues">Request Feature</a>
  </p>
</div>

## Semester and class
2022 Spring NTHU CS 241002	

<!-- ABOUT THE PROJECT -->
## About The Project
This is an online mario game made from scratch.

## Built With

* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

## Basic Components Description : 
* Membership Mechanism
  *  Sign up / Log in (5%)
![](https://i.imgur.com/e1dgVxf.png)

* Game Process
  * Start menu / Level select
![](https://i.imgur.com/IvNNUhR.png)
  * Game complete
![](https://i.imgur.com/5hdHMJr.png)
  * Game over
![](https://i.imgur.com/vJ4v36d.png)

* World map
  * Stage 1
![](https://i.imgur.com/jDoiQUH.png)

  * Stage 2
![](https://i.imgur.com/7z6W1mL.png)

* Player
![](https://i.imgur.com/6qe4Dvu.png)
  * Player have correct physics properties.
  * User can control the player to move and jump by keyboard.
  * When player touches enemies or be attacked by enemies, it will get hurt or the number of its life will decrease.
  * When player dies, it can reborn at the last-passed checkpoint unless the life is already 0.

* Enemies
  * <img src="https://i.imgur.com/cbOcSTk.png"  width="35" height="35"> goomba
    * When player touches goomba, he would lose one life and start at the starting point or check point.
  * <img src="https://i.imgur.com/tV9n0mt.png"  width="35" height="35"> turtle
    * If playing touches turtle, his speed will be downgraded for five seconds, and he will lose points as well.

* Blocks
  * ![](https://i.imgur.com/58XQtDR.png) question block 
    * Player will earn money when he touches question block
  * ![](https://i.imgur.com/RHhYHZ0.png) cloud block
    * Player will jump higher for five seconds when he touches cloud block.

* Animations
Player has walk & jump animations. goomba and turtle enemies have animation as well. 

* Sound effects
Every page has BGM, Player Jump & die sound effects, coin sound effect, check point effect.

* UI
Player's life, points, and user name can be uploaded to firebase. In-game timer is provided as well.

## Advanced Component Description : 

**leader board**
![](https://i.imgur.com/I4gRB5j.png)

# Link

[website link](https://software-studio-hw2-mario-game.web.app/) (Link may expire due to firebase policy)

## Contact

[![gmail][gmail]][gmail-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Lewis-Tsai/Software-Studio-Assignment-02.svg?style=for-the-badge
[contributors-url]: https://github.com/Lewis-Tsai/Software-Studio-Assignment-02/contributors
[forks-shield]: https://img.shields.io/github/forks/Lewis-Tsai/Software-Studio-Assignment-02.svg?style=for-the-badge
[forks-url]: https://github.com/Lewis-Tsai/Software-Studio-Assignment-02/network/members
[stars-shield]: https://img.shields.io/github/stars/Lewis-Tsai/Software-Studio-Assignment-02.svg?style=for-the-badge
[stars-url]: https://github.com/Lewis-Tsai/Software-Studio-Assignment-02/stargazers
[issues-shield]: https://img.shields.io/github/issues/Lewis-Tsai/Software-Studio-Assignment-02.svg?style=for-the-badge
[issues-url]: https://github.com/Lewis-Tsai/Software-Studio-Assignment-02/issues
[license-shield]: https://img.shields.io/github/license/Lewis-Tsai/Software-Studio-Assignment-02.svg?style=for-the-badge
[license-url]: https://github.com/Lewis-Tsai/Software-Studio-Assignment-02/blob/master/license
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/lewis-tsai-7b570421a

[gmail]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[gmail-url]: mailto:A38050787@gmail.com