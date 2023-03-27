package com.example.tictactoe;

public class StatusResponseDTO {
    private CheckResult status;

    public StatusResponseDTO(CheckResult status) {
        this.status = status;
    }

    public CheckResult getStatus() {
        return status;
    }

    public void setStatus(CheckResult status) {
        this.status = status;
    }
}
