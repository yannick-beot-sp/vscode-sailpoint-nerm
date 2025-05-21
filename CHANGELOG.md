# Change Log

All notable changes to the "vscode-sailpoint-nerm" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.


## Unreleased

### Fixed

- Fix issue while sorting and filtering columns to display
- Filtering NeprofileUser and NeaccessUser users

## [0.0.7] - 2025-05-11

### Added

- Can add a new attribute to a profile

### Fixed

- Roles were not refreshed when hitting refresh

## [0.0.6] - 2025-05-05

### Added

- Add column filters for status and type for users
- Add column filter for status for profiles

### Fixed

- If there was no profile for a profile type, the spinner was turning forever.

## [0.0.5] - 2025-04-20

### Added

- View, edit, delete profiles. Not all attributes can be edited. When an attribute is referencing another profile, you can open the profile

## [0.0.4] - 2025-03-17

### Changed

- Add cache for users & roles for better performance, and the possibility to refresh

## [0.0.3] - 2025-01-28

### Fixed

- Fixed packaging issue that did not include webview

## [0.0.2] - 2025-01-24

### Added

- Updated documentation
- Better management of cache/state

## [0.0.1] - 2025-01-22

Initial internal release

### Added

- Add or remove tenant
- Add or remove folder
- View users, edit, add or remove role
- View roles, add or remove members