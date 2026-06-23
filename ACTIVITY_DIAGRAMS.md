# 📊 Activity Diagrams - Adopt House

Dokumentasi alur aktivitas untuk fitur-fitur utama Adopt House menggunakan Mermaid State Diagram (UML Activity Style).

---

## 1️⃣ State Diagram: User Melakukan Favorit

```mermaid
stateDiagram-v2
    [*] --> LoginCheck: User Click Favorite
    
    LoginCheck --> ShowLoginAlert: User Belum Login
    ShowLoginAlert --> [*]
    
    LoginCheck --> RoleCheck: User Sudah Login
    
    RoleCheck --> ShowAdminAlert: User adalah Admin
    ShowAdminAlert --> [*]
    
    RoleCheck --> CheckStatus: User Biasa (Bukan Admin)
    
    CheckStatus --> RemoveFlow: Pet Sudah Difavoritkan
    CheckStatus --> AddFlow: Pet Belum Difavoritkan
    
    RemoveFlow --> DeleteAPI: Hapus dari Favorites
    DeleteAPI --> DeleteSuccess: API Berhasil
    DeleteSuccess --> UpdateContext1: Update FavoritesContext
    DeleteSuccess --> DeleteError: API Error
    
    DeleteError --> ShowError1: Tampilkan Error Toast
    ShowError1 --> [*]
    
    UpdateContext1 --> UpdateUI1: Update Button UI (Gray)
    UpdateUI1 --> SyncPages1: Sync Semua Pages
    SyncPages1 --> RemoveFromDash: Hapus dari Dashboard
    RemoveFromDash --> [*]
    
    AddFlow --> AddAPI: Tambah ke Favorites
    AddAPI --> AddSuccess: API Berhasil
    AddSuccess --> UpdateContext2: Update FavoritesContext
    AddSuccess --> AddError: API Error
    
    AddError --> ShowError2: Tampilkan Error Toast
    ShowError2 --> [*]
    
    UpdateContext2 --> UpdateUI2: Update Button UI (Red)
    UpdateUI2 --> SyncPages2: Sync Semua Pages
    SyncPages2 --> AddToDash: Tambah ke Dashboard
    AddToDash --> ShowSuccess: Tampilkan Success Toast
    ShowSuccess --> [*]
    
    note right of LoginCheck
        Validasi user login
        & role permission
    end note
    
    note right of CheckStatus
        Cek status current
        favorite di context
    end note
    
    note right of UpdateContext1
        Remove petId dari
        Set<favoritedPetIds>
    end note
    
    note right of UpdateContext2
        Add petId ke
        Set<favoritedPetIds>
    end note
    
    note right of SyncPages1
        Global state update
        → semua component
        re-render
    end note
    
    note right of SyncPages2
        Global state update
        → semua component
        re-render
    end note
```

### 📝 Penjelasan State Flow:

| State | Deskripsi |
|-------|-----------|
| **LoginCheck** | Validasi user sudah login & bukan admin |
| **ShowLoginAlert** | Jika user belum login, tampilkan login required alert |
| **RoleCheck** | Cek apakah user adalah admin |
| **ShowAdminAlert** | Jika admin, tampilkan alert hanya user biasa |
| **CheckStatus** | Lihat apakah pet sudah difavoritkan di context |
| **RemoveFlow** | Alur hapus favorite (DELETE /favorites/:id) |
| **AddFlow** | Alur tambah favorite (POST /favorites) |
| **UpdateContext1/2** | Update global FavoritesContext Set |
| **UpdateUI1/2** | Button berubah warna (red ↔ gray) |
| **SyncPages1/2** | Semua instances pet update otomatis |
| **RemoveFromDash/AddToDash** | Pet hilang/muncul di dashboard |

---

## 2️⃣ State Diagram: Admin Membuat Pet Posting

```mermaid
stateDiagram-v2
    [*] --> AdminCheck: Admin Akses Create Page
    
    AdminCheck --> ShowUnauth: Admin Tidak Verified
    ShowUnauth --> [*]
    
    AdminCheck --> FormDisplay: Admin Verified
    
    FormDisplay --> FillForm: Tampilkan Form Input
    
    FillForm --> UploadImages: Admin Isi Semua Field
    
    UploadImages --> SelectPhotos: Admin Upload Gambar
    
    SelectPhotos --> Validation: Validation Check
    
    Validation --> ValidationFail: Form Invalid
    ValidationFail --> FormDisplay: Highlight Error
    
    Validation --> ValidationPass: Form Valid
    ValidationPass --> Preview: Tampilkan Preview
    
    Preview --> ReviewDecision: Admin Review Posting
    
    ReviewDecision --> EditAgain: Admin Ingin Edit
    EditAgain --> FillForm: Kembali Edit Form
    
    ReviewDecision --> ReadySubmit: Admin Siap Submit
    ReadySubmit --> PrepareData: Prepare FormData
    
    PrepareData --> APISubmit: POST /postings + Images
    
    APISubmit --> UploadProcess: Server Process Images
    
    UploadProcess --> DatabaseSave: Save ke Database
    
    DatabaseSave --> APISuccess: API Response OK
    DatabaseSave --> APIError: API Error / Network Error
    
    APIError --> ErrorAlert: Tampilkan Error Alert
    ErrorAlert --> RetryDecision: Retry atau Batalkan
    
    RetryDecision --> RetryNow: User Retry
    RetryNow --> PrepareData
    
    RetryDecision --> RetryCancel: User Batalkan
    RetryCancel --> FormDisplay
    
    APISuccess --> SuccessNotif: Tampilkan Success Toast
    
    SuccessNotif --> RefreshList: Refresh Pet List
    
    RefreshList --> ShowNewPet: Pet Baru Muncul di List
    
    ShowNewPet --> FinalRedirect: Redirect ke Pet Detail
    
    FinalRedirect --> [*]
    
    note right of AdminCheck
        Middleware verify
        admin role & JWT
    end note
    
    note right of FillForm
        Nama, Breed, Age,
        Deskripsi, Health Info
    end note
    
    note right of UploadImages
        Support multiple
        image upload
    end note
    
    note right of Validation
        Check required fields
        & file format/size
    end note
    
    note right of Preview
        Show preview sebelum
        final submission
    end note
    
    note right of PrepareData
        Buat FormData dengan
        pet data + images
    end note
    
    note right of APISubmit
        POST ke backend
        dengan FormData
    end note
    
    note right of UploadProcess
        Server process images
        & store to cloud
    end note
```

### 📝 Penjelasan State Flow:

| State | Deskripsi |
|-------|-----------|
| **AdminCheck** | Middleware verifikasi admin role & JWT token |
| **ShowUnauth** | Jika bukan admin, redirect ke home |
| **FormDisplay** | Tampilkan form input posting |
| **FillForm** | Admin isi nama, breed, age, deskripsi, etc |
| **UploadImages** | Admin upload multiple pet photos |
| **SelectPhotos** | Preview & confirm selected images |
| **Validation** | Cek required fields & file format/size |
| **ValidationFail** | Highlight error fields, kembali ke form |
| **ValidationPass** | Semua field valid, lanjut preview |
| **Preview** | Tampilkan preview final posting |
| **ReviewDecision** | Admin review & decide edit atau submit |
| **EditAgain** | Admin ingin edit kembali |
| **ReadySubmit** | Admin siap submit final |
| **PrepareData** | Siapkan FormData dengan file |
| **APISubmit** | POST ke backend `/postings` |
| **UploadProcess** | Server process images & store |
| **DatabaseSave** | Save posting record ke database |
| **APISuccess** | Response OK, posting created |
| **APIError** | Error response atau network error |
| **ErrorAlert** | Show error notification |
| **RetryDecision** | User bisa retry atau batalkan |
| **SuccessNotif** | Show success toast notification |
| **RefreshList** | Refresh pet list di admin panel |
| **ShowNewPet** | Pet baru muncul di list |
| **FinalRedirect** | Redirect ke pet detail page |

---

## 3️⃣ Swimlane Style: User Favorite dengan Client-Server

```mermaid
stateDiagram-v2
    [*] --> [CLIENT] User_View: User pada PetCard
    
    state CLIENT {
        User_View --> Click_Button: User Click Favorite
        Click_Button --> Check_Auth: Validasi Login
        Check_Auth --> Call_API: Kirim Request
        Call_API --> Wait_Response: Tunggu Response
        Wait_Response --> Handle_Result: Handle Response
        Handle_Result --> Update_UI: Update Button
        Update_UI --> Update_Context: Update Context
    }
    
    [CLIENT] Update_Context --> [SERVER] Receive_Request: API Call
    
    state SERVER {
        Receive_Request --> Verify_Token: Verify JWT
        Verify_Token --> Verify_Role: Check User Role
        Verify_Role --> Parse_Data: Parse Request Body
        Parse_Data --> Save_DB: Save/Delete dari DB
        Save_DB --> Response_OK: Return Success
    }
    
    [SERVER] Response_OK --> [CLIENT] Complete: Response ke Client
    
    Complete --> Sync_All: Sync FavoritesContext
    Sync_All --> [*]
    
    note right of User_View
        User lihat pet card
        di homepage/search
    end note
    
    note right of Check_Auth
        Validasi user login
        & bukan admin
    end note
    
    note right of Call_API
        POST /favorites atau
        DELETE /favorites/:id
    end note
    
    note right of Verify_Token
        Validasi JWT token
        dari Authorization header
    end note
    
    note right of Save_DB
        Insert/Delete ke
        favorites table
    end note
    
    note right of Sync_All
        Update global
        FavoritesContext
        → semua components
        re-render
    end note
```

---

## 4️⃣ Swimlane Style: Admin Create Posting dengan Client-Server

```mermaid
stateDiagram-v2
    [*] --> [ADMIN_CLIENT] Open_Page: Admin Buka Create Page
    
    state ADMIN_CLIENT {
        Open_Page --> Check_Middleware: Middleware Check
        Check_Middleware --> Display_Form: Display Form
        Display_Form --> Admin_Input: Admin Isi Form + Upload Images
        Admin_Input --> Validate_Local: Validate Locally
        Validate_Local --> Show_Errors: Show Error Messages
        Show_Errors --> Admin_Correct: Admin Correct Data
        Admin_Correct --> Validate_Local
        Validate_Local --> Preview: Show Preview
        Preview --> Admin_Review: Admin Review
        Admin_Review --> Decision: Approve or Edit
        Decision --> Admin_Input: Edit Kembali
        Decision --> Prepare: Siap Submit
        Prepare --> Submit_API: POST /postings
        Submit_API --> Uploading: Uploading Images
    }
    
    [ADMIN_CLIENT] Uploading --> [BACKEND] Receive_Post: Server Receive
    
    state BACKEND {
        Receive_Post --> Verify_Admin: Verify Admin JWT
        Verify_Admin --> Create_Record: Create Pet Record
        Create_Record --> Process_Images: Process Images
        Process_Images --> Save_Storage: Save to Cloud Storage
        Save_Storage --> Save_Pet: Save Pet Reference
        Save_Pet --> Return_Success: Return Success Response
    }
    
    [BACKEND] Return_Success --> [ADMIN_CLIENT] Complete: Response Received
    
    Complete --> Show_Success: Show Success Toast
    Show_Success --> Refresh_List: Refresh Pet List
    Refresh_List --> Redirect_Detail: Redirect to Detail
    Redirect_Detail --> [*]
    
    note right of Check_Middleware
        Middleware verify
        admin access
    end note
    
    note right of Admin_Input
        Multiple fields
        + multiple images
    end note
    
    note right of Validate_Local
        Frontend validation
        sebelum submit
    end note
    
    note right of Verify_Admin
        Verify JWT token
        & admin role
    end note
    
    note right of Process_Images
        Resize, optimize,
        generate thumbnails
    end note
    
    note right of Save_Storage
        Upload to cloud
        (S3/GCS/etc)
    end note
```

---

## 🔄 Alur Integrasi Sistem

```mermaid
graph LR
    User["👤 User<br/>Client Side"] -->|Favorit| API1["🔌 API<br/>POST/DELETE"]
    API1 -->|Response| DB1[("💾 Database<br/>Favorites Table")]
    DB1 -->|Fetch| API1
    
    Admin["👨‍💼 Admin<br/>Client Side"] -->|Create Pet| API2["🔌 API<br/>POST /postings"]
    API2 -->|Save| DB2[("💾 Database<br/>Postings Table")]
    API2 -->|Upload| Storage["📁 Cloud Storage<br/>Images"]
    
    UI1["🎨 UI Component<br/>PetCard"] -->|Read| Context["🔗 FavoritesContext"]
    Context -->|State| UI1
    
    Dashboard["📊 Dashboard"] -->|Filter| Context
    DetailPage["📄 Pet Detail"] -->|Check| Context
    
    style User fill:#bbdefb
    style Admin fill:#fff9c4
    style API1 fill:#ffe0b2
    style API2 fill:#ffe0b2
    style DB1 fill:#c8e6c9
    style DB2 fill:#c8e6c9
    style Storage fill:#f0f4c3
    style Context fill:#d1c4e9
    style UI1 fill:#f8bbd0
    style Dashboard fill:#b2dfdb
    style DetailPage fill:#b2dfdb
```

---

## 🎯 State Flow - Favorite Feature

```mermaid
graph TD
    Init["🔄 Initial State<br/>favoritedPetIds = new Set()"] 
    Init --> Login["👤 User Login"]
    Login --> Load["📡 FavoritesContext:<br/>Load Favorites from API"]
    Load --> Populated["✅ favoritedPetIds Populated<br/>Set contains all pet IDs"]
    
    Populated --> Toggle{"User Click<br/>Favorite Button?"}
    
    Toggle -->|Add| Add["➕ Add petId to Set"]
    Add --> API["POST /favorites"]
    API --> Success1["✅ API Success"]
    Success1 --> Updated["🔄 Set Updated<br/>All components re-render"]
    Updated --> Toggle
    
    Toggle -->|Remove| Remove["➖ Remove petId from Set"]
    Remove --> API2["DELETE /favorites/:id"]
    API2 --> Success2["✅ API Success"]
    Success2 --> Updated
    
    Toggle -->|Error| Error["❌ API Error"]
    Error --> Retry["🔁 Retry or Show Error"]
    Retry --> Toggle
    
    style Init fill:#e3f2fd
    style Populated fill:#c8e6c9
    style Updated fill:#bbdefb
    style Success1 fill:#c8e6c9
    style Success2 fill:#c8e6c9
```

---

## 📊 Perbandingan User vs Admin Flow

| Aspek | User Favorite | Admin Create Posting |
|-------|---------------|---------------------|
| **Authorization** | Cek user login | Cek admin role + middleware |
| **Data Input** | Minimal (just click) | Extensive (form fields) |
| **Validation** | Cek pet ID valid | Form validation + image |
| **API Call** | 1 endpoint | 1 endpoint + image upload |
| **Database** | Update favorites table | Insert postings table |
| **Storage** | N/A | Upload images to storage |
| **UI Update** | Instant (context) | Redirect to detail page |
| **Time Estimate** | < 1 detik | 3-10 detik (include upload) |

---

## 🔐 Security Considerations

### User Favorite Flow
```
✅ JWT Token dalam header
✅ Validate user ownership (backend)
✅ Rate limiting (prevent spam)
✅ Input sanitization
```

### Admin Create Posting Flow
```
✅ JWT Token dalam header
✅ Verify admin role (backend)
✅ Middleware protection (frontend)
✅ File type validation (images only)
✅ File size limits
✅ Virus scanning
✅ Malware detection
```

---

**Last Updated:** 23 Juni 2026  
**Created By:** Adopt House Documentation Team
