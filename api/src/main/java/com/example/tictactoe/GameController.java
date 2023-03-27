package com.example.tictactoe;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.BitSet;
import java.util.List;

@RestController
public class GameController {

    private static final List<BitSet> WINNING_POSITONS;

    static {
        WINNING_POSITONS = new ArrayList<>();
        WINNING_POSITONS.addAll(initRowColWinningPositions());
        WINNING_POSITONS.addAll(initDiagonalWinningPositions());
        debugInfo(WINNING_POSITONS, "ALL");
    }

    private static List<BitSet> initRowColWinningPositions() {
        List<BitSet> winningLines = new ArrayList<>();
        for (int r = 0; r < 3; r++) {
            BitSet winningRow = new BitSet(9);
            BitSet winningColumn = new BitSet(9);
            BitSet descDiag = new BitSet(9);
            for (int c = 0; c < 3; c++) {
                winningRow.set(c + r * 3);
                winningColumn.set(r + c * 3);
            }
            winningLines.add(winningRow);
            winningLines.add(winningColumn);
        }
        return winningLines;
    }

    private static List<BitSet> initDiagonalWinningPositions() {
        List<BitSet> winningDiagonals = new ArrayList<>();
        BitSet descDiag = new BitSet(9);
        descDiag.set(0);
        descDiag.set(4);
        descDiag.set(8);
        BitSet ascDiag = new BitSet(9);
        ascDiag.set(6);
        ascDiag.set(4);
        ascDiag.set(2);
        winningDiagonals.add(descDiag);
        winningDiagonals.add(ascDiag);
        return winningDiagonals;
    }

    private static void debugInfo(List<BitSet> bitSets, String headerMessage) {
        System.out.println(headerMessage);
        bitSets.forEach((b) -> {
            for (int i = 0; i < 9; i++) {
                System.out.print(b.get(i) ? "1" : "0");
                if ((i + 1) % 3 == 0) {
                    System.out.println();
                }
            }
            System.out.println();
        });
    }

    @PostMapping(path = "/game/check")
    public ResponseEntity<StatusResponseDTO> getTest(@RequestBody GameDTO gameState) {
        BitSet xBoard = bitboardize(gameState.getxIndexes());
        BitSet oBoard = bitboardize(gameState.getoIndexes());
        return ResponseEntity.ok(new StatusResponseDTO(CheckResult.VICTORY_X));
    }

    private BitSet bitboardize(List<Integer> indexes) {
        BitSet result = new BitSet();
        for (int index : indexes) {
            result.set(index);
        }
        return result;
    }
}
