# DoMitra Frontend - Session Cookie Configuration Guide

## ✅ CRITICAL FIX APPLIED

The frontend has been configured to **send session cookies** with every API request. This is essential for the backend's Spring Boot session-based authentication.

---

## What Was Changed

### 1. **serviceApi.ts** - Service API Client
```javascript
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,  // ← ADDED: Send cookies with every request
  headers: {
    "Content-Type": "application/json",
  },
});
```

### 2. **authApi.ts** - Auth API Client
```javascript
const authClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,  // ← ADDED: Send cookies with auth requests
});
```

---

## How to Test Session Cookie Handling

### Step 1: Check Browser Cookies
After logging in via Google OAuth2:
1. Open Chrome DevTools (F12)
2. Go to **Application** → **Cookies** → **http://localhost:5173**
3. You should see a session cookie like:
   - `JSESSIONID` (Spring default)
   - Or `SESSION` (custom name)

### Step 2: Verify Cookie in Network Requests
1. Go to **Network** tab in DevTools
2. Make any API request (click on a service, go to Dashboard, etc.)
3. Click on the request in the Network tab
4. Open **Request Headers**
5. You should see:
   ```
   Cookie: JSESSIONID=abc123def456...
   ```

### Step 3: Test Protected Endpoints
1. **After login**, your Dashboard should load services
2. **Try "Reveal Phone Number"** on a service card → should show phone
3. **Try "My Services"** → should show your created services
4. **Try "Add Service"** → form should work and submit

### Step 4: Test Complete Login Flow
```
1. Visit landing page
2. Click "Get Started" or login button
3. You're redirected to Google OAuth
4. After successful login, you're redirected back to http://localhost:5173
5. Check browser cookies - should have session cookie
6. Navigate to Dashboard → services should load
7. All protected endpoints should work
```

---

## Common Issues & Solutions

### ❌ Issue: "401 Unauthorized" on protected endpoints after login

**Cause:** Cookie not being sent with requests  
**Solution:** Check that `withCredentials: true` is set in axios config

### ❌ Issue: Login works but Dashboard shows empty services

**Cause:** API calls not including session cookie  
**Solution:** Verify cookies in Network tab → should see `Cookie:` header

### ❌ Issue: "No cookie in browser" after login

**Cause:** Backend not setting cookie or OAuth callback not working  
**Solution:** Check backend CORS configuration allows `http://localhost:5173`

### ✅ Issue: "Cookie is there but still 401"

**Check:**
1. Is your backend session configuration correct?
2. Is the OAuth callback properly setting the user session?
3. Are protected endpoints checking session correctly?

---

## Configuration Details

### API Client Configuration

**All API calls now include:**
- ✅ `withCredentials: true` - Send cookies automatically
- ✅ Base URL: `http://localhost:8080`
- ✅ Content-Type: `application/json` (default)
- ✅ Multipart support for image uploads (createService)

### Affected Endpoints

| Endpoint | Requires Auth | Cookie Sent |
|----------|---------------|-------------|
| GET /categories | No | ✅ Yes (but not needed) |
| GET /services | No | ✅ Yes |
| GET /services/{id} | No | ✅ Yes |
| POST /services/{id}/contact | **Yes** | ✅ Yes |
| POST /services | **Yes** (image upload) | ✅ Yes |
| GET /services/user/mine | **Yes** | ✅ Yes |
| GET /services/{id}/analytics | **Yes** | ✅ Yes |
| GET /oauth2/authorization/google | No | ✅ Yes |
| GET /user/me | **Yes** | ✅ Yes |

---

## Development Testing Checklist

- [ ] Backend Spring Boot running on `http://localhost:8080`
- [ ] Frontend running on `http://localhost:5173`
- [ ] CORS configured on backend to allow `http://localhost:5173` with credentials
- [ ] Login redirects to Google OAuth
- [ ] After login, session cookie appears in browser
- [ ] API requests show `Cookie:` header in Network tab
- [ ] Dashboard loads services (public endpoint works with session)
- [ ] Protected endpoints work (My Services, Reveal Phone, etc.)
- [ ] Build succeeds without errors
- [ ] No 401 errors on protected endpoints after login

---

## Quick Diagnostic Command

To check if cookies are being sent, run this in browser console:
```javascript
// Check if axios includes credentials
fetch('http://localhost:8080/services', {
  credentials: 'include'  // Same as withCredentials: true
})
  .then(r => r.json())
  .then(d => console.log('Cookies sent successfully:', d))
  .catch(e => console.log('Error (check Network tab):', e))
```

---

## Backend CORS Requirements

Your Spring Boot backend should have configured CORS like this:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173")  // Frontend URL
                    .allowedMethods("*")
                    .allowedHeaders("*")
                    .allowCredentials(true)  // CRITICAL for cookies
                    .maxAge(3600);
            }
        };
    }
}
```

The key: **`allowCredentials(true)`** must be set!

---

## Summary

✅ **Frontend configured to send cookies**
- All axios instances have `withCredentials: true`
- Image uploads (multipart) include cookies
- Auth endpoints include cookies

🔍 **To verify it's working:**
1. Log in via Google OAuth
2. Open DevTools Network tab
3. Check for `Cookie: JSESSIONID=...` in request headers
4. All protected endpoints should return 200

🚀 **Once verified, you're ready for:**
- User authentication and session management
- Protected service creation and management
- Analytics tracking per user
- Account-specific features

---

**Built:** March 11, 2026  
**Framework:** React + Vite + Axios  
**Backend:** Spring Boot (http://localhost:8080)  
**Frontend:** http://localhost:5173
