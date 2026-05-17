FROM oven/bun:1

# Install essential linux commands
RUN apt-get update && apt-get install -y \
    ca-certificates \
    sudo \
    curl \
    git \
    unzip \
    build-essential \
    libssl-dev \
    pkg-config \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Switch to Bun user
USER bun
WORKDIR /home/bun

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/home/bun/.cargo/bin:${PATH}"

# Install sqlx-cli
RUN cargo install sqlx-cli --no-default-features --features postgres

# Create Hephaestus folder to use as working directory
WORKDIR /workspace