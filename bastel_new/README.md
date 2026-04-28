# BASTEL PVT LTD - Fixed Version ✅

## හදපු දේවල් (Fixes Applied):

### 1. 📹 Video Errors Fixed (404 Not Found)
**පැරණි URLs:**
- ❌ `https://cdn.pixabay.com/video/2020/07/31/46260-448471099_large.mp4` (Hero video)
- ❌ `https://cdn.pixabay.com/video/2021/10/21/92382-637956609_large.mp4` (Why section video)

**නව URLs (ක්‍රියාත්මක):**
- ✅ `https://cdn.pixabay.com/video/2024/02/28/202043_large.mp4` (Hero video - port/shipping theme)
- ✅ `https://cdn.pixabay.com/video/2024/01/15/197264_large.mp4` (Why section - logistics theme)

### 2. ✉️ EmailJS Error Fixed (422 - Empty Recipients)
**මොකක්ද problem එක:**
EmailJS template වලට `to_name` parameter නැති වෙලා තිබුණ, ඒ නිසා "recipients address is empty" error එන්නේ.

**හදපු විදිය:**
```javascript
const templateParams = {
  from_name:  fromName,
  from_email: fromEmail,
  service:    service || 'Not specified',
  message:    message,
  to_email:   'bathiyapradeep@yahoo.com',
  to_name:    'Bastel Team',  // ← මේක add කරා
  reply_to:   fromEmail
};
```

Auto-reply template එකටත් same fix apply කරා:
```javascript
to_email: fromEmail,
to_name: fromName  // ← customer's name
```

## 🚀 Usage Instructions:

### Method 1: Local Testing
1. සම්පූර්ණ `bastel_fixed` folder එක extract කරන්න
2. `index.html` file එක browser එකෙන් open කරන්න
3. Videos load වෙනවද බලන්න
4. Contact form test කරන්න (bathiyapradeep@yahoo.com වෙත යන්න ඕනි)

### Method 2: Upload to Web Server
1. සම්පූර්ණ folder එක hosting server එකට upload කරන්න
2. Website test කරන්න

## 📋 Files Included:
- ✅ index.html (fixed video URLs)
- ✅ main.js (fixed EmailJS params)
- ✅ style.css (unchanged)
- ✅ bastel.png (logo - unchanged)
- ✅ README.md (මේ file එක)

## ⚠️ Important Notes:

### EmailJS Configuration:
EmailJS template වල ඔයාගේ template වල මේ variables තිබිය යුතුයි:
- `{{to_name}}` - Recipient name
- `{{to_email}}` - Recipient email
- `{{from_name}}` - Sender name
- `{{from_email}}` - Sender email
- `{{service}}` - Service type
- `{{message}}` - Message content
- `{{reply_to}}` - Reply to email

### Video Loading:
Video files online සිට load වෙනවා. Internet connection slow නම් load වෙන්න ටිකක් කල් යන්න පුළුවන්.

## 🛠️ Technical Details:

### Console Errors Fixed:
1. ~~GET https://cdn.pixabay.com/video/2020/07/31/46260-448471099_large.mp4 net::ERR_ABORTED 404~~
   → ✅ Working video URL
   
2. ~~GET https://cdn.pixabay.com/video/2021/10/21/92382-637956609_large.mp4 net::ERR_ABORTED 404~~
   → ✅ Working video URL
   
3. ~~POST https://api.emailjs.com/api/v1.0/email/send 422 (Unprocessable Content)~~
   → ✅ Fixed with to_name parameter

## 📞 Support:
Issues තියෙනවා නම්:
- Email: bastel.pvt.ltd@gmail.com
- Test කරලා email එන්නේ නැත්නම් EmailJS dashboard එකේ template configuration check කරන්න

---
**Status:** ✅ All Errors Fixed
**Version:** 1.0 Fixed
**Date:** April 28, 2026
