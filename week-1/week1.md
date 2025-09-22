
## Git/GitHub Workflow

### 1. Creating a Repository
- A **repository** (or "repo") stores **project files** and their **history**, created either **locally** or on a **hosting service** like **GitHub**.
- **Local**:
  - Navigate to your **project folder** in the **terminal**.
  - Run `git init` to create a hidden `.git` folder that tracks **project history**.
- **Remote** (e.g., **GitHub**):
  - Visit the **GitHub website** and click **"New repository"**.
  - Assign a **name** and **create** the repository.
  - Link your **local folder** to the **remote repo** with:
    ```bash
    git remote add origin <URL>
    git push -u origin main
    ```

### 2. Branching
- **Branching** allows work on **new features** or **bug fixes** without altering the **main codebase**. The **main branch** is the **stable**, production-ready version.
- Create a new **branch**:
  ```bash
  git checkout -b <branch-name>
  ```
  - This **shortcut** creates and switches to the new **branch**.
- List all **branches**:
  ```bash
  git branch
  ```
- Switch between **branches**:
  ```bash
  git checkout <branch-name>
  ```

### 3. Making Changes and Committing
- On your **branch**, make **changes** to files and **commit** logical chunks of work.
- **Stage** changes:
  ```bash
  git add .
  ```
  - Stages all **changes** in the current directory, preparing them for **commit**.
- **Commit** changes:
  ```bash
  git commit -m "Clear and concise message describing changes"
  ```
  - The **commit message** should explain the purpose of the changes.
- **Push** the branch to the **remote repository**:
  ```bash
  git push -u origin <branch-name>
  ```

### 4. Pull Requests (PRs)
- A **Pull Request (PR)** is a **formal request** to **merge** changes from one **branch** into another (typically **main**), facilitating **team collaboration** and **code review**.
- **Creating a PR**:
  - **Push** your branch to the **remote repository**.
  - On **GitHub**, a **prompt** will appear to create a **Pull Request** for the pushed branch.
- **PR Process**:
  - **Teammates** review the **code** and provide **feedback**.
  - **Automated tests** check for **errors**.
  - Approved changes are **merged** into the **main branch**.

### 5. Merging vs. Rebasing
- **Merging** and **rebasing** are methods to **integrate changes** between **branches**.
- **Merging**:
  - Combines **branches** with a **merge commit**, preserving the full **commit history**.
  - **Pros**: **Safe**, maintains historical context.
  - **Command**:
    ```bash
    git checkout main
    git merge <feature-branch>
    ```
- **Rebasing**:
  - **Replays** a branch’s **commits** on top of another, creating a **linear history**.
  - **Pros**: Cleaner, **straight-line history** without **merge commits**.
  - **Cons**: Rewrites **commit history**, problematic for shared **branches**.
  - **Command**:
    ```bash
    git checkout <feature-branch>
    git rebase main
    ```

### 6. Resolving Merge Conflicts
- A **merge conflict** occurs when **Git** cannot automatically combine changes due to edits on the **same lines** in a **file**.
- **Conflict Markers**:
  ```bash
  <<<<<<< HEAD
  Your changes
  =======
  Other person's changes
  >>>>>>> <branch-name>
  ```
- **Resolution Steps**:
  - **Manually edit** the file to keep desired **changes** or combine both.
  - **Remove** conflict markers.
  - **Stage** the resolved file:
    ```bash
    git add <file-name>
    ```
  - **Commit** the merge:
    ```bash
    git commit
    ```

---

## System Design Learning Ladder: From Fundamentals to Distributed Systems Mastery

### I. Introduction: Why System Design Matters
- **System design** is the foundation for building **robust**, **efficient**, and **reliable** software systems.
- It enables engineers to address **complex challenges**, excel in **technical evaluations**, and align solutions with **user needs** and **business goals**.
- Provides a **decision-making framework** for the **software development lifecycle**, ensuring **consistency**, **quality**, and **integrity**.
- **Benefits**:
  - Enhances **quality assurance** by reducing defects and improving **reliability**.
  - Streamlines **development**, minimizing waste and accelerating delivery.
  - Promotes **collaboration** and **communication** among team members.
  - Simplifies **maintenance** and supports **scalability** with modular code and documentation.
  - Facilitates **risk mitigation** by identifying issues early.
- Integrates **technical choices** with **business objectives** and **team dynamics**, driven by **non-functional requirements**.
- The **learning ladder** progresses from **foundational concepts** to **intermediate techniques** and **distributed systems mastery**.

### II. Level 1: Foundational Concepts (Basic)

#### Core Software Engineering Principles
- Guide **software development** to ensure **quality** and **maintainability**.
- **KISS (Keep It Simple, Stupid)**: Prioritize **simplicity** to avoid unnecessary **complexity**.
- **DRY (Don't Repeat Yourself)**: Eliminate **redundancy** via **code reuse** and **modular design**.
- **YAGNI (You Aren't Gonna Need It)**: Implement only **required features**, avoiding **over-engineering**.
- **Separation of Concerns**: Divide software into **independent modules** with **singular responsibilities** for **loose coupling** and **high cohesion**.
- **Modularity**: Design **interchangeable**, **reusable modules** for easy modification and testing.
- **SOLID Principles**:
  - **Single Responsibility Principle (SRP)**: Each module has one **well-defined responsibility**.
  - **Open-Closed Principle (OCP)**: Entities are **open for extension**, **closed for modification**.
  - **Liskov Substitution Principle (LSP)**: Subtypes must substitute base types without breaking correctness.
  - **Interface Segregation Principle (ISP)**: Clients avoid depending on **unnecessary interfaces**.
  - **Dependency Inversion Principle (DIP)**: High-level modules depend on **abstractions**, not implementations.
- These principles prevent **technical debt**, ensuring **maintainable**, **flexible** systems.

#### Understanding System Components
- **System architecture** defines **structure**, **behavior**, and **perspectives** through components:
  - **Hardware Platform**: **Servers**, **storage**, and **network equipment** designed for **scalability**.
  - **Software Platform**: **Operating systems** and **applications** chosen for **performance** and **compatibility**.
  - **System Interfaces**: Enable **communication** via **APIs**, **protocols**, and **data formats**.
  - **System Structure**: Organizes **components**, **data flow**, and **interactions** for efficiency and **maintenance**.
  - **Security**: Protects against **unauthorized access** using **authentication**, **encryption**, and **access controls**.

#### Basic Architectural Styles
- **Monolithic Architecture**:
  - Tightly integrated **single unit**.
  - **Pros**: Simple to develop and deploy initially.
  - **Cons**: Hard to maintain and scale; changes impact the entire system.
- **Client-Server Architecture**:
  - Divides into **clients** (request services) and **servers** (process requests).
  - **Pros**: Scalable, manageable, secure.
  - **Cons**: Costly, complex, dependent on centralized servers.
- **Peer-to-Peer (P2P) Architecture**:
  - **Decentralized** nodes act as both **clients** and **servers**.
  - **Pros**: Resilient, scalable, cost-effective.
  - **Cons**: Security risks, permission challenges, mobile device issues.

### III. Level 2: Intermediate Concepts

#### Scaling and Performance Optimization
- **Scalability**: Handles **increased workloads** without quality degradation.
- **Performance**: Measures efficiency (speed, responsiveness, throughput) under specific loads.
- Balancing **performance** and **scalability** is critical.
- **Horizontal vs. Vertical Scaling**:
  - **Vertical Scaling (Scaling Up)**: Add resources (CPU, RAM) to a single machine.
    - **Pros**: Simple, immediate performance boost.
    - **Cons**: Limited by hardware, costly.
  - **Horizontal Scaling (Scaling Out)**: Add machines to distribute workload.
    - **Pros**: Cost-effective, unlimited growth.
    - **Cons**: Complex coordination, data consistency challenges.
  - **Diagonal Scaling**: Combines both approaches for flexibility.

#### Caching
- Stores **frequently accessed data** in **fast, temporary storage** to reduce retrieval time and database load.
- **Types**:
  - **In-memory Application Cache**: Fast, server-specific storage.
  - **Distributed In-memory Cache**: Shared cache (e.g., **Memcached**, **Redis**).
  - **Database Cache**: Caches frequent queries/results.
  - **File System Cache**: Used in **CDNs** for geographic efficiency.
- **Caching Policies**:
  - **FIFO**: Evicts oldest data.
  - **LRU**: Evicts least recently used data.
  - **LFU**: Evicts least frequently used data.
  - **ARC**: Combines **LRU** and **LFU**.
- **Cache Consistency Models**:
  - **Write-Through**: Simultaneous cache and database updates; ensures consistency, slows writes.
  - **Write-Behind**: Cache updates first, database later; fast but risks inconsistency.
  - **Cache-Aside**: Loads data on demand; requires careful eviction policies.
- Uses **TTLs** and **fallback mechanisms** to manage stale data and failures.

#### Load Balancing
- Distributes traffic across servers for **scalability**, **availability**, and **performance**.
- **Strategies**:
  - **Round Robin**: Evenly distributes requests.
  - **Least Connections**: Routes to the server with fewest connections.
  - **IP Hashing**: Routes same client IP to the same server.
  - **Consistent Hashing**: Assigns servers based on IP/URL.
- **Advantages**: Scalability, reliability, faster responses.
- **Considerations**: Potential bottlenecks, session management complexity.

#### Database Optimization
- **Indexing**: Uses **B-trees** or **hash tables** to speed up **read queries**.
  - **Pros**: Faster retrieval.
  - **Cons**: Slower **write operations**.
- **Sharding**: Divides data into **shards** across servers for **performance** and **scalability**.
  - Requires effective **shard key** to avoid hotspots.
- **Replication**: Maintains data copies for **availability** and **fault tolerance**.
  - **Synchronous**: Real-time updates, strong consistency, higher latency.
  - **Asynchronous**: Periodic updates, lower latency, potential data loss.
- **Denormalization**: Adds redundancy to improve **read performance** by reducing joins.
  - **Pros**: Faster queries, simpler logic.
  - **Cons**: Increased storage, potential inconsistencies.
- **Connection Pooling**: Reuses database connections to reduce **latency** and server strain.

#### API Design
- **APIs** define system communication using **HTTP** with **JSON** or **XML**.
- **Styles**:
  - **REST**: Resource-based, uses **HTTP methods** (GET, POST, PUT, DELETE).
  - **RPC**: Executes remote procedures as local calls; lightweight.
  - **GraphQL**: Precise queries for specific data; flexible but complex.
  - **SOAP**: XML-based, secure but bulky; used in high-security scenarios.
- **API Gateway**: Centralized entry point for **routing**, **protocol translation**, **authentication**, **rate limiting**, **caching**, **monitoring**, and **fault tolerance**.

#### Messaging Systems
- **Message Queues**: Enable **asynchronous**, **one-to-one** communication.
  - **Components**: **Producer** (sends messages), **Queue** (stores messages), **Consumer** (processes messages).
  - **Uses**: Decouples tasks, buffers workloads, enhances **fault tolerance**, balances load.
- **Publish-Subscribe (Pub/Sub)**: **One-to-many** model for **notifications** and **real-time broadcasting**.

### IV. Level 3: Advanced Concepts (Distributed Systems Mastery)

#### Advanced Architectural Patterns
- **Microservices Architecture**:
  - Small, independent services for specific functions.
  - **Pros**: Agility, scalability, resilience, technology flexibility.
  - **Cons**: Complex network management, data consistency challenges, operational overhead.
- **Event-Driven Architecture (EDA)**:
  - Responds to **events** for **real-time processing**.
  - **Components**: **Event Producers**, **Event Routers**, **Event Consumers**.
  - **Pros**: Decoupling, agility, cost efficiency, real-time processing.
- **Layered Architecture**:
  - Organizes software into **layers** (Presentation, Application/Business, Persistence/Domain, Database).
  - **Pros**: Separation of concerns, maintainability, testability.
  - **Cons**: Performance overhead, potential rigidity.
- **Microkernel Architecture**:
  - Minimal **core functionality** with pluggable components.
  - **Pros**: Reduced complexity, enhanced security, modularity.
- **Space-Based Architecture (SBA)**:
  - Uses **distributed memory grid** for **scalability** and **fault tolerance**.
  - **Components**: **Processing Units**, **Space**, **Router**.
  - **Pros**: Horizontal scalability, resilience, low-latency data access.
- **Pipe-and-Filter Architecture**:
  - Processes data through sequential **filters** connected by **pipes**.
  - **Components**: **Pumps**, **Filters**, **Pipes**, **Sinks**.
  - **Pros**: Modularity, reusability, concurrency, efficiency.

#### System Reliability and Fault Tolerance
- **High Availability Strategies**:
  - **Load Balancing**: Distributes traffic to prevent bottlenecks.
  - **Redundancy**:
    - **Active-Active**: All components share workload.
    - **Active-Passive**: Standby components take over on failure.
    - **N-Modular**: Parallel units out-vote errors.
    - **Geographic**: Duplicates systems across regions.
  - **Failover**: Automatic switching to backup systems.
  - **Replication**: Maintains data copies for reliability.
  - **Auto Scaling**: Adjusts resources based on demand.
- **Resilience Patterns**:
  - **Retry**: Re-sends failed requests with configurable retries.
  - **Fallback**: Provides alternative data/behavior on failure.
  - **Circuit Breaker**: Prevents cascading failures by blocking unhealthy dependencies.
- **Disaster Recovery Planning (DRP)**:
  - **Stages**: Prevention, Preparation, Mitigation, Recovery.
  - **Steps**: Risk analysis, vulnerability assessment, identifying critical processes, setting recovery objectives, defining backup methods, establishing protocols, regular testing.

#### Distributed System Challenges and Solutions
- **Data Consistency Models**:
  - **Strong Consistency**: All reads reflect the latest write.
  - **Eventual Consistency**: Nodes converge to the same state over time.
  - **Causal Consistency**: Maintains order for causally related operations.
- **CAP Theorem**:
  - Guarantees only two of **Consistency**, **Availability**, and **Partition Tolerance**.
  - Prioritize based on system needs (e.g., **CP** or **AP**).
- **Consensus Algorithms**:
  - **Paxos**: Ensures agreement with fault tolerance; complex.
  - **Raft**: Simplifies consensus with leader-based approach.
  - **Zab**: Powers **ZooKeeper** for coordination and consistency.
- **Distributed Transactions**:
  - Ensures **atomicity** across multiple nodes.
  - **Two-Phase Commit (2PC)**: Coordinates commits with **Prepare** and **Commit** phases.
  - **Challenges**: Network failures, high latency, blocking.
- **Distributed Locking**:
  - Controls access to shared resources to prevent **race conditions**.
  - Approaches: **Database Locks**, **Cache-Based Locks (Redis)**, **Coordination Services (ZooKeeper)**, **Lease-based Locks**.

#### System Security
- **Security Design Principles**:
  - **Least Privilege**: Restrict permissions to the minimum required.
  - **Separation of Duties**: Spread responsibilities to reduce risks.
  - **Open Design**: Use transparent, well-tested protections.
  - **Defense in Depth**: Layer multiple security controls.
  - **Fail Securely**: Default to secure state on failure.
  - **Economy of Mechanism**: Simplify security to reduce vulnerabilities.
- **Authentication and Authorization**:
  - **Authentication**: Verifies identity (e.g., passwords, **MFA**, biometrics, tokens).
  - **Authorization**: Determines permissions (e.g., **RBAC**, device-based).
- **Data Encryption**:
  - **In Transit**: Uses **TLS**, **ALTS**, or **IPsec** for secure transmission.
  - **At Rest**: Encrypts stored data to prevent unauthorized access.
- **Threat Modeling**: Identifies risks and mitigation strategies early.
- **Incident Response Planning (IRP)**:
  - Phases: **Preparation**, **Detection and Analysis**, **Containment, Eradication, and Recovery**, **Post-Incident Activity**.

#### Observability
- **Observability**: Infers system state from **logs**, **metrics**, and **traces**.
- **Monitoring, Logging, Alerting**:
  - **Monitoring**: Tracks metrics (e.g., query duration, memory usage).
  - **Logging**: Records events for debugging.
  - **Alerting**: Notifies teams of anomalies.
- **Three Pillars of Observability**:
  - **Logs**: Chronological event records.
  - **Metrics**: Numerical data for system health.
  - **Traces**: Maps request flow across services.
- **Alerting Strategies**:
  - **Multi-Layer Filtering**: Refines alerts by severity.
  - **Contextual Alerting**: Adds context to notifications.
  - **Event Correlation**: Groups related alerts for actionable insights.

#### Case Studies (Real-World Application)
- **Netflix**:
  - **Challenge**: Deliver video to millions with minimal latency.
  - **Strategies**: **CDN (Open Connect)**, **microservices**, **NoSQL databases (Cassandra, DynamoDB)**, **caching (EVCache)**, **Chaos Engineering**, **API Gateway (Zuul)**.
- **Amazon**:
  - **Challenge**: Handle massive e-commerce demands.
  - **Strategies**: **Microservices**, **event-driven architecture (Kafka)**, **sharded DynamoDB**, **multi-region replication**, **caching (Redis)**, **auto-scaling**, **circuit breakers**.
- **Google**:
  - **Challenge**: Massive scale and reliability.
  - **Strategies**: **Horizontal scaling**, **data partitioning**, **global load balancing**, **redundancy**.
- **Facebook**:
  - **Challenge**: Manage billions of users and real-time updates.
  - **Strategies**: **Caching (Memcache)**, **data replication**, **eventual consistency**, **fan-out-on-write**, **distributed ID generation (Snowflake)**.
- **Uber**:
  - **Challenge**: Real-time driver-rider matching and pricing.
  - **Strategies**: **Event-driven architecture (Kafka)**, **microservices**, **geo-distributed databases**, **global load balancing**, **data analytics**.
- **Twitter**:
  - **Challenge**: Handle thousands of tweets per second.
  - **Strategies**: **Horizontal scaling**, **caching (Redis, Memcached)**, **eventual consistency**, **message queues**, **fan-out-on-write**, **distributed ID generation**.

### V. Conclusions
- **System design** evolves from **foundational principles** to **distributed systems mastery**.
- The **learning ladder** integrates **technical skills**, **business objectives**, and **collaboration**.
- **Level 1**: Covers **core principles** (KISS, DRY, SOLID) and **basic architectures** (monolithic, client-server, P2P).
- **Level 2**: Focuses on **scaling**, **caching**, **load balancing**, **database optimization**, and **API design**.
- **Level 3**: Addresses **distributed systems** with **advanced architectures**, **reliability**, **security**, and **observability**.
- **Case studies** demonstrate practical applications.
- Success requires a **continuous learning mindset** and applying **theory** to **real-world problems**.

---

## Software Development Life Cycle (SDLC)

**Last Updated**: July 14, 2025

The **Software Development Life Cycle (SDLC)** is a structured methodology for designing, developing, and testing high-quality software, ensuring it is **maintainable**, meets **user requirements**, and is delivered within **budget** and **time constraints**.

### What is SDLC?
- A **framework** for the software development process.
- Improves **software quality** and streamlines **development**.
- Used by organizations to plan, develop, maintain, and enhance software.

### Stages of SDLC
1. **Planning and Requirement Analysis**:
   - Gather **customer inputs** and **market surveys**.
   - Forms the project foundation, emphasizing **planning** for **quality**.
2. **Defining Requirements**:
   - Specify **software requirements** with approval from **customers**, **analysts**, and **stakeholders**.
   - Documented in a **Software Requirement Specification (SRS)**.
3. **Designing Architecture**:
   - Use **SRS** to propose **architecture designs** in a **Design Document Specification (DDS)**.
   - **Stakeholders** select the most practical design.
4. **Developing Product**:
   - Code based on **DDS** using languages like **C/C++**, **Python**, **Java**.
   - Follow **protocols** with tools like **compilers** and **debuggers**.
5. **Product Testing and Integration**:
   - Conduct **testing** to fix **flaws** and ensure **SRS compliance**.
   - Includes **documentation**, **training**, and **support** for usability and maintenance.
6. **Deployment and Maintenance**:
   - Release in **phases**, test in a **real environment**, and deploy fully if successful.
   - Provide **maintenance** and updates based on **feedback**.

### SDLC Models
- Frameworks for managing software projects:
  - **Waterfall Model**: Linear, sequential.
  - **Agile Model**: Iterative, collaborative.
  - **V-Model**: Testing integrated with each stage.
  - **Spiral Model**: Risk-driven, iterative.
  - **Incremental Model**: Incremental feature releases.
  - **RAD Model**: Rapid application development.

### Why SDLC is Needed
- Provides a **disciplined**, **systematic approach** to development.
- Breaks processes into **manageable parts** for easier problem-solving.
- Ensures **clarity** and **structure** in design, development, testing, and maintenance.

### SDLC and Security
- Security often delayed to **testing phase**, risking vulnerabilities.
- **DevSecOps** integrates **security** throughout SDLC, from **build** to **production**.

### Real-Life Example: Banking Application
1. **Planning and Analysis**: Gather **requirements** and create **SRS**.
2. **Design**: Develop **system architecture** and **web page designs** based on **SRS**.
3. **Development**: Code **web pages** and **APIs**.
4. **Testing**: Perform **functional testing** for a glitch-free platform.
5. **Deployment and Maintenance**: Deploy, enable **customer access**, and maintain with new features.

### Conclusion
- **SDLC** ensures structured, high-quality software development.
- Its **phases** promote **efficiency**, **quality**, and alignment with **user needs**.
- Adopting **SDLC principles** supports innovation in a rapidly evolving technological landscape.

---
