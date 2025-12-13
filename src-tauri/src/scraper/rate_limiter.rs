use governor::{Quota, RateLimiter, state::InMemoryState, clock::DefaultClock, middleware::NoOpMiddleware};
use governor::state::NotKeyed;
use std::num::NonZeroU32;

pub type AppRateLimiter = RateLimiter<NotKeyed, InMemoryState, DefaultClock, NoOpMiddleware>;

pub fn create_limiter() -> AppRateLimiter {
    // 60 requests per minute
    let quota = Quota::per_minute(NonZeroU32::new(60).unwrap());
    RateLimiter::direct(quota)
}
