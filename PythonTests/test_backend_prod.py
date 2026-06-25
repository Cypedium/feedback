import requests
import json

BASE_URL = "https://aurellfeedback-backend.fly.dev"

# ---------------------------------------------------
# 1. Helper: pretty print JSON
# ---------------------------------------------------
def print_json(data):
    try:
        print(json.dumps(data, indent=2, ensure_ascii=False))
    except:
        print(data)

# ---------------------------------------------------
# 2. Test unauthenticated routes
# ---------------------------------------------------
def test_public_routes():
    print("\n=== TEST: PUBLIC ROUTES ===")

    # Register
    print("\nPOST /auth/register")
    res = requests.post(f"{BASE_URL}/auth/register", json={
        "email": "python_test@example.com",
        "password": "test1234"
    })
    print("Status:", res.status_code)
    print_json(res.json())

    # Login
    print("\nPOST /auth/login")
    res = requests.post(f"{BASE_URL}/auth/login", json={
        "email": "python_test@example.com",
        "password": "test1234"
    })
    print("Status:", res.status_code)
    login_data = res.json()
    print_json(login_data)

    access_token = login_data.get("accessToken")
    refresh_token = login_data.get("refreshToken")

    return access_token, refresh_token

# ---------------------------------------------------
# 3. Test authenticated routes
# ---------------------------------------------------
def test_private_routes(access_token):
    print("\n=== TEST: PRIVATE ROUTES ===")

    headers = {"Authorization": f"Bearer {access_token}"}

    # GET feedbacks
    print("\nGET /feedbacks (or /feedback depending on backend)")
    res = requests.get(f"{BASE_URL}/feedbacks", headers=headers)
    print("Status:", res.status_code)
    try:
        print_json(res.json())
    except:
        print(res.text)

    # POST feedback
    print("\nPOST /feedback")
    res = requests.post(f"{BASE_URL}/feedback", json={
        "message": "Python test feedback",
        "rating": 5
    }, headers=headers)
    print("Status:", res.status_code)
    created = res.json()
    print_json(created)

    feedback_id = created.get("id")

    # DELETE feedback
    if feedback_id:
        print(f"\nDELETE /feedback/{feedback_id}")
        res = requests.delete(f"{BASE_URL}/feedback/{feedback_id}", headers=headers)
        print("Status:", res.status_code)
        try:
            print_json(res.json())
        except:
            print(res.text)

# ---------------------------------------------------
# 4. Test refresh token
# ---------------------------------------------------
def test_refresh(refresh_token):
    print("\n=== TEST: REFRESH TOKEN ===")

    headers = {"Authorization": f"Bearer {refresh_token}"}

    print("\nGET /auth/refresh")
    res = requests.get(f"{BASE_URL}/auth/refresh", headers=headers)
    print("Status:", res.status_code)
    print_json(res.json())

# ---------------------------------------------------
# 5. Run all tests
# ---------------------------------------------------
if __name__ == "__main__":
    print("🚀 Testing AurellFeedback backend...\n")

    access_token, refresh_token = test_public_routes()

    if access_token:
        test_private_routes(access_token)

    if refresh_token:
        test_refresh(refresh_token)

    print("\n🎉 Done! All routes tested.")
