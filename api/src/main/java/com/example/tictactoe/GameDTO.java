package com.example.tictactoe;

import java.util.ArrayList;
import java.util.List;

public class GameDTO {

    private List<Integer> xIndexes = new ArrayList<>();
    private List<Integer> oIndexes = new ArrayList<>();

    public List<Integer> getxIndexes() {
        return xIndexes;
    }

    public void setxIndexes(List<Integer> xIndexes) {
        this.xIndexes = xIndexes;
    }

    public List<Integer> getoIndexes() {
        return oIndexes;
    }

    public void setoIndexes(List<Integer> oIndexes) {
        this.oIndexes = oIndexes;
    }
}
