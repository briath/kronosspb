#!/usr/bin/env python3
"""
Simple test script for Telegram Bot API

Usage:
  python test_api.py
"""

import requests
import json
from typing import Dict, Any

# Configuration
API_URL = "http://localhost:5000"
API_KEY = "your-secret-api-key-change-this"  # Change this to your API_KEY

# Colors for terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def print_header(text: str):
    print(f"\n{Colors.HEADER}{Colors.BOLD}{text}{Colors.ENDC}")


def print_success(text: str):
    print(f"{Colors.OKGREEN}✅ {text}{Colors.ENDC}")


def print_error(text: str):
    print(f"{Colors.FAIL}❌ {text}{Colors.ENDC}")


def print_info(text: str):
    print(f"{Colors.OKCYAN}ℹ️  {text}{Colors.ENDC}")


def print_json(data: Dict[Any, Any]):
    print(Colors.OKBLUE + json.dumps(data, indent=2, ensure_ascii=False) + Colors.ENDC)


def test_health() -> bool:
    """Test if API server is running"""
    print_header("1. Testing API Health")
    
    try:
        response = requests.get(f"{API_URL}/health", timeout=5)
        
        if response.status_code == 200:
            print_success("API server is running!")
            print_json(response.json())
            return True
        else:
            print_error(f"API returned status {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print_error(f"Could not connect to {API_URL}")
        print_info("Make sure API server is running: python api_server.py")
        return False
    except Exception as e:
        print_error(f"Error: {e}")
        return False


def test_status() -> bool:
    """Test bot status"""
    print_header("2. Testing Bot Status")
    
    try:
        response = requests.get(
            f"{API_URL}/api/status",
            headers={"X-API-Key": API_KEY},
            timeout=5
        )
        
        if response.status_code == 200:
            print_success("Bot status retrieved!")
            print_json(response.json())
            return True
        elif response.status_code == 401:
            print_error("Invalid API key!")
            print_info(f"Update API_KEY in this script to match your telegram_bot/.env")
            return False
        else:
            print_error(f"API returned status {response.status_code}")
            return False
            
    except Exception as e:
        print_error(f"Error: {e}")
        return False


def test_inquiry(name: str = "Test User", phone: str = "+7 (921) 123-45-67", message: str = "Test message") -> bool:
    """Test sending an inquiry"""
    print_header("3. Testing Inquiry Submission")
    
    print_info(f"Sending inquiry:")
    print_info(f"  Name: {name}")
    print_info(f"  Phone: {phone}")
    print_info(f"  Message: {message}")
    
    try:
        response = requests.post(
            f"{API_URL}/api/inquiry",
            headers={
                "X-API-Key": API_KEY,
                "Content-Type": "application/json"
            },
            json={
                "name": name,
                "phone": phone,
                "message": message
            },
            timeout=10
        )
        
        print_info(f"Response status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print_success("Inquiry sent successfully!")
                print_json(data)
                print_info("Check your Telegram for the message!")
                return True
            else:
                print_error(f"Send failed: {data.get('error')}")
                print_json(data)
                return False
        elif response.status_code == 401:
            print_error("Invalid API key!")
            return False
        else:
            print_error(f"API returned status {response.status_code}")
            print_json(response.json())
            return False
            
    except Exception as e:
        print_error(f"Error: {e}")
        return False


def main():
    """Run all tests"""
    print(f"{Colors.BOLD}🤖 INGENIOUS SYSTEMS - Telegram Bot API Test{Colors.ENDC}")
    print(f"{Colors.BOLD}API URL: {API_URL}{Colors.ENDC}")
    print(f"{Colors.BOLD}API Key: {API_KEY[:10]}...{Colors.ENDC}")
    
    # Run tests
    tests_passed = 0
    tests_total = 3
    
    if test_health():
        tests_passed += 1
    
    if test_status():
        tests_passed += 1
    
    if test_inquiry():
        tests_passed += 1
    
    # Summary
    print_header("📊 Test Summary")
    print(f"Passed: {Colors.OKGREEN}{tests_passed}/{tests_total}{Colors.ENDC}")
    
    if tests_passed == tests_total:
        print_success("All tests passed! System is working correctly.")
    else:
        print_error(f"Some tests failed. {tests_total - tests_passed} tests to fix.")
        print_info("Check the errors above and update your configuration if needed.")


if __name__ == "__main__":
    main()
