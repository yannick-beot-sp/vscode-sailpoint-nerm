<a id="readme-top"></a>

<!--  based on https://github.com/othneildrew/Best-README-Template -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/yannick-beot-sp/vscode-sailpoint-nerm">
    <img src="resources/nerm.png" alt="Logo" width="256" height="160">
  </a>

<h3 align="center">SailPoint Non-Employee Risk Management for Visual Studio Code</h3>

  <p align="center">
    Extension to easily manage SailPoint Non-Employee Risk Management
    <br />
    <br />
    <a href="#release-notes">View Release Notes</a>
    &middot;
    <a href="#usage">View Demo</a>
    &middot;
    <a href="https://github.com/yannick-beot-sp/vscode-sailpoint-nerm/issues/new?labels=bug&template=bug_report.md">Report Bug</a>
    &middot;
    <a href="https://github.com/yannick-beot-sp/vscode-sailpoint-nerm/issues/new?template=feature_request.md">Request Feature</a>
  </p>
</div>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-this-extension">About this extension</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#add-new-tenant">Add new tenant</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#release-notes">Release Notes</a></li>
    <li>
      <a href="#contributing">Contributing</a>
      <ul>
        <li><a href="#top-contributors">Top contributors</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THIS EXTENSION -->

## About this extension

> **This extension is not developed, maintained or supported by SailPoint.**
> **It is a community effort to help manage Non-Employee Risk Management from Visual Studio Code.**

<!--[![Product Name Screen Shot][product-screenshot]](https://example.com)-->

The SailPoint Non-Employee Risk Management extension makes it easy to:

- View, edit users and add them to roles
- View roles users and add users
- View, edit, delete profiles

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

Go to the extension menu or press `Ctrl`+`Shift`+`X` and look for the extension "Non-Employee Risk Management". Click on the button `Install`.

The VSIX can be installed from the extension menu. Press `Ctrl`+`Shift`+`X` and in the menu, click `Install from VSIX...`.

### Add new tenant

The extension supports several tenants.

Open the **Command Palette** with `Ctrl+Shift+P` (Windows or Linux) or `Cmd+Shift+P` (macOS) to find the command "NERM: Add tenant..." or simply click ➕ in the "NERM TENANTS" view.

You will asked for:
- A friendly name
- The API URL, e.g. `https://mycompany.mynonemployee.com/api`
- An API Key (Go to **Admin**, under **Sytem**, go to **Api**)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

![Add tenant](https://raw.githubusercontent.com/yannick-beot-sp/vscode-sailpoint-nerm/main/resources/readme/add-tenant.gif)

<!-- ROADMAP -->

## Release Notes


### 0.0.7

- Can add a new attribute to a profile
- Roles were not refreshed when hitting refresh

### 0.0.6

- If there was no profile for a profile type, the spinner was turning forever.
- Add column filters for status and type for users
- Add column filter for status for profiles

### 0.0.5

- View, edit, delete profiles. Not all attributes can be edited. When an attribute is referencing another profile, you can open the profile

### 0.0.4

- Add cache for users & roles for better performance, and the possibility to refresh

### 0.0.3

- Fixed packaging issue that did not include webview

### 0.0.2

- Updated documentation
- Better management of cache/state

### 0.0.1

Initial internal release

- Add or remove tenant
- Add or remove folder
- View users, edit, add or remove role
- View roles, add or remove members

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/yannick-beot-sp/vscode-sailpoint-nerm/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yannick-beot-sp/vscode-sailpoint-nerm" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/yannick-beot-sp/vscode-sailpoint-nerm.svg?style=for-the-badge
[contributors-url]: https://github.com/yannick-beot-sp/vscode-sailpoint-nerm/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/yannick-beot-sp/vscode-sailpoint-nerm.svg?style=for-the-badge
[forks-url]: https://github.com/yannick-beot-sp/vscode-sailpoint-nerm/network/members
[stars-shield]: https://img.shields.io/github/stars/yannick-beot-sp/vscode-sailpoint-nerm.svg?style=for-the-badge
[stars-url]: https://github.com/yannick-beot-sp/vscode-sailpoint-nerm/stargazers
[issues-shield]: https://img.shields.io/github/issues/yannick-beot-sp/vscode-sailpoint-nerm.svg?style=for-the-badge
[issues-url]: https://github.com/yannick-beot-sp/vscode-sailpoint-nerm/issues
[license-shield]: https://img.shields.io/github/license/yannick-beot-sp/vscode-sailpoint-nerm.svg?style=for-the-badge
[license-url]: https://github.com/yannick-beot-sp/vscode-sailpoint-nerm/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
