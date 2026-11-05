---
updated: "2026-11-05"
---

FilePocket is an Android app by SouMoster for browsing, opening, moving and cleaning the files on your phone. This is the privacy policy for the app. The website has its own policy.

## All files access

If you allow it, FilePocket can read and change the files in your phone's shared storage, SD cards and USB drives. That is what a file manager is for, and Android requires this permission for it. FilePocket uses it only to show you your files and to do what you ask. Android keeps other apps' private folders out of reach, so FilePocket can't see inside them. If you decline, you can pick individual folders to use instead.

## What stays on the phone

Your files stay where they are. To search quickly, FilePocket keeps a list of file names, sizes, dates and folders in its private storage, but never what's inside your files. Favourites, recently opened files, your place in each file, thumbnails and preferences are also stored on the device. SouMoster does not offer an account, and the app does not show ads, use analytics or send crash reports. SouMoster never receives your files, their names or your activity. If you use the AI features below, the text involved goes to OpenAI.

## Trash

Files you delete move to a hidden folder on the same storage and are permanently deleted after the number of days you choose, 30 by default. You can restore them or empty the trash at any time. If you uninstall FilePocket, anything still in the trash stays in its hidden `.FilePocketTrash` folder until you delete it.

## Network drives

The app has the internet permission for network drives you add yourself and for the optional AI features below, and it connects to nothing else. When you copy to or from a drive, your files and login go directly between your phone and the server you chose, over SMB, SFTP, FTP or FTPS. Plain FTP is not encrypted, and FilePocket warns you when you choose it. What happens on your server is up to whoever runs it. Each drive's password is encrypted with a key held in Android's Keystore.

## AI features

AI features are optional and stay off until you paste your own OpenAI API key in Settings. The key is encrypted on the phone, is sent only to OpenAI, and is left out of Android backups and device-to-device transfer. When you tap Summarise or Explain on an open text file, that file's text and type, such as .csv, go to OpenAI, up to a limit. When you describe a search, only the words you typed go. File names, locations, the search index and your other files do not, and the search itself runs on the phone. Nothing is sent automatically or in the background. The text goes directly from your phone to OpenAI over an encrypted connection, and OpenAI handles it under its own terms and privacy policy. Usage is billed to your OpenAI account. SouMoster never receives your key or the text. To stop, remove the key in Settings.

## Sharing and other apps

Apart from network drives and AI actions, a file leaves FilePocket only when you share it or open it in another app, such as PlayPocket, ReadPocket or NotesPocket. That app gets access to that file only, and handles it under its own privacy policy. FilePocket never runs the files it shows you.

## App lock

If you turn app lock on, FilePocket asks the phone to check your fingerprint, face or screen lock, or asks for a PIN you set. The phone's check stays on the device. For a PIN, only a salted hash is stored.

## Backups and deleting your data

Your search index, history, trash records, drive passwords and OpenAI key are left out of Android backups and device-to-device transfer. Preferences may move with Android's backup, including the hash of an app PIN if you use one. To remove the app's own data, use Android Settings → Apps → FilePocket → Storage → Clear storage. SouMoster holds no FilePocket data, so there is nothing to request from us.

## Contact

Questions about this policy: [soumoster@gmail.com](mailto:soumoster@gmail.com).
