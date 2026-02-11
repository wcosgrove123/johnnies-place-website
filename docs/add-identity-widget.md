# Adding Netlify Identity Widget

After you've set up Netlify and enabled Identity, you need to add the Identity widget to all HTML pages.

## What to Add

### 1. In the `<head>` section of each HTML file:

Add this line before the closing `</head>` tag:

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

### 2. Before the closing `</body>` tag of each HTML file:

Add this script:

```html
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

## Files to Update

You need to add these to:
- ✓ index.html
- ✓ about.html
- ✓ mission.html
- ✓ blog.html
- ✓ support.html
- ✓ contact.html

## Example

Here's what the end of your HTML files should look like:

```html
  <script src="js/main.js"></script>

  <!-- Netlify Identity Widget -->
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  <script>
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  </script>
</body>
</html>
```

## Once Added

1. Commit your changes to Git
2. Push to GitHub
3. Netlify will automatically redeploy
4. Your admin panel at `/admin/` will now work with authentication
